from uuid import UUID

from core.database import SESSION
from core.models.favourite import Favourite
from core.models.perfume import Perfume
from dto.exception_dto import ErrorDTO
from dto.success_dto import SuccessDTO
from sqlalchemy import delete, exists, select
from sqlalchemy.exc import DBAPIError
from sqlalchemy.orm import joinedload

from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository


class FavouriteRepository(BaseSQLAlchemyRepository):
    model = Favourite
    additional_tables = ["perfume"]

    async def toggle(self, user_id: UUID, perfume_id: UUID):
        try:
            async with SESSION() as session:
                exist_statement = select(
                    exists().where(
                        self.model.user_id == user_id,
                        self.model.perfume_id == perfume_id,
                    )
                )

                result = await session.execute(exist_statement)
                data = result.scalar()

                if not data:
                    insert_data = self.model(user_id=user_id, perfume_id=perfume_id)
                    session.add(insert_data)
                    await session.commit()
                    return SuccessDTO("Entity created")

                statement = delete(self.model).where(
                    self.model.user_id == user_id,
                    self.model.perfume_id == perfume_id,
                )
                await session.execute(statement)
                await session.commit()

                return SuccessDTO("Entity deleted")

        except DBAPIError:
            return ErrorDTO("Database error", 500)

    async def get_user_favorites(self, user_id: UUID, page: int = 0, limit: int = 30):
        try:
            async with SESSION() as session:
                statement = (
                    select(self.model)
                    .options(
                        joinedload(self.model.perfume),
                        joinedload(self.model.perfume, Perfume.file),
                        joinedload(self.model.perfume, Perfume.perfume_volume),
                    )
                    .where(self.model.hidden == False, self.model.user_id == user_id)
                    .offset((page - 1) * limit)
                    .limit(limit)
                )
                statement = await session.execute(statement)
                data = statement.scalars().unique().all()

                if data is None:
                    return ErrorDTO("Data not found", 404)

                return SuccessDTO[self.model](data)

        except DBAPIError as e:
            print(e)
            return ErrorDTO("Database error", 500)
