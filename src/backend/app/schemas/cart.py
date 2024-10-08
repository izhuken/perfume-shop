from datetime import date, datetime
from uuid import UUID

from pydantic import BaseModel, Field

from ._base import BaseSchema
from .perfume_volume import PerfumeVolumeRead


class StatusRead(BaseSchema):
    id: UUID
    create_time: datetime
    title: str
    description: str
    hidden: bool | None = Field(default=False)


class UserRead(BaseSchema):
    id: UUID
    username: str
    email: str
    phone: str
    address: str
    is_active: bool
    create_time: datetime
    update_time: datetime


class CartPerfumeRead(BaseSchema):
    quantity: int
    perfume_volume_id: UUID
    cart_id: UUID
    id: UUID
    create_time: datetime


class CartPerfumeAdminRead(CartPerfumeRead):
    perfume_volume: PerfumeVolumeRead


class CartBase(BaseSchema):
    status_id: UUID | None


class CartReadBase(CartBase):
    id: UUID
    user_id: UUID
    create_time: datetime
    delivery_date: datetime | None
    buy_date: datetime | None
    issue_date: datetime | None


class CartRead(CartBase):
    id: UUID
    user_id: UUID
    create_time: datetime
    delivery_date: datetime | None
    buy_date: datetime | None
    issue_date: datetime | None
    cart_perfume: list[CartPerfumeRead] | None
    status: StatusRead | None


class CartAdminRead(CartReadBase):
    user: UserRead | None
    cart_perfume: list[CartPerfumeAdminRead] | None


class CartCreate(CartBase):
    user_id: UUID


class CartUpdate(CartBase):
    pass


class CartSearch(BaseModel):
    delivery_date: date | None = Field(default=None)
    buy_date: date | None = Field(default=None)
    issue_date: date | None = Field(default=None)
    status_id: UUID | None = Field(default=None)
    user_id: UUID | None = Field(default=None)
    hidden: bool | None = Field(default=None)
