from uuid import UUID

from app.schemas.file import FileCreate, FileRead, FileUpdate
from app.schemas.response import ErrorResponse, SuccessResponse
from app.service.file import FileService
from fastapi import APIRouter, HTTPException, Request, UploadFile, File, Depends

file_router = APIRouter(prefix="/file", tags=["File"])

service = FileService()

from os import fstat
from fastapi import FastAPI, Request, UploadFile, File
from fastapi.responses import JSONResponse
from core.s3_store import minio_client, bucket_name, minio_host
from minio.error import S3Error


@file_router.get("/get_all")
async def get_all(request: Request, 
                page: int = 1, 
                quantity: int = 50, 
                order_by: str | None = None):
    data = await service.get_all(request=request, 
                                page=page, 
                                quantity=quantity, 
                                order_by=order_by)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@file_router.get("/get_by_condition/{id}", response_model=FileRead)
async def get_by_id(id: UUID) -> FileRead:
    data = await service.get_by_id(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@file_router.post("/create", response_model=FileRead, status_code=201)
async def create(request: Request, data: FileCreate = Depends(), file: UploadFile = File(...)) -> FileRead:
    data = await service.create(data=data, request=request, file=file)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@file_router.patch("/update", response_model=FileRead)
async def update(id: UUID, data: FileUpdate) -> FileRead:
    data = await service.update(id=id, data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@file_router.delete("/delete", response_model=SuccessResponse)
async def delete(id: UUID) -> SuccessResponse:
    data = await service.delete(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data