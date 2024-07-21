from uuid import UUID

from app.schemas.response import ErrorResponse, SuccessResponse
from app.schemas.status import StatusCreate, StatusRead, StatusUpdate
from app.service.status import StatusService
from fastapi import APIRouter, HTTPException, Request

status_router = APIRouter(prefix="/status", tags=["Status"])

service = StatusService()


@status_router.get("/get_all")
async def get_all(request: Request, page: int = 1, quantity: int = 50, order_by: str | None = None):
    data = await service.get_all(request=request, page=page, quantity=quantity, order_by=order_by)

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@status_router.get("/get_by_condition", response_model=StatusRead)
async def get_by_id(id: UUID) -> StatusRead:
    data = await service.get_by_id(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@status_router.post("/create", response_model=StatusRead, status_code=201)
async def create(data: StatusCreate) -> StatusRead:
    data = await service.create(data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@status_router.post("/update", response_model=StatusRead)
async def update(id: UUID, data: StatusUpdate) -> StatusRead:
    data = await service.update(id=id, data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@status_router.delete("/delete", response_model=SuccessResponse)
async def delete(id: UUID) -> SuccessResponse:
    data = await service.delete(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data