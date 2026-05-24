from sqlalchemy import Column, Integer, String, Float, Text
from app.db.session import Base


class DataLahan(Base):
    __tablename__ = "data_lahan"

    id_lahan = Column(Integer, primary_key=True, index=True)
    nama_lokasi = Column(String(255), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    jarak_ke_tol_km = Column(Float, nullable=True)
    harga_per_meter = Column(Integer, nullable=True)
    keterangan = Column(Text, nullable=True)
