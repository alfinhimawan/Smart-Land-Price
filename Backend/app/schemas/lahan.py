from pydantic import BaseModel
from typing import Optional


# Base Schema untuk request/response yang berbagi atribut yang sama
class LahanBase(BaseModel):
    nama_lokasi: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    jarak_ke_tol_km: Optional[float] = None
    harga_per_meter: Optional[int] = None
    keterangan: Optional[str] = None


# Schema untuk pembuatan data baru (Create)
class LahanCreate(LahanBase):
    id_lahan: int
    nama_lokasi: str
    latitude: float
    longitude: float
    harga_per_meter: int


# Schema untuk response (Read)
class LahanResponse(LahanBase):
    id_lahan: int

    class Config:
        # Mengizinkan pydantic membaca data dari SQLAlchemy model
        from_attributes = True
