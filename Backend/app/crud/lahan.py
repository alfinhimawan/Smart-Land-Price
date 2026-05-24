from sqlalchemy.orm import Session
from app.models.lahan import DataLahan


def get_all_lahan(db: Session):
    """
    Mengambil semua data titik sampel lahan dari database.
    """
    return db.query(DataLahan).all()


def get_lahan_by_jarak(db: Session, max_jarak: float):
    """
    Menyaring data lahan berdasarkan radius jarak maksimum.
    """
    return db.query(DataLahan).filter(DataLahan.jarak_ke_tol_km <= max_jarak).all()