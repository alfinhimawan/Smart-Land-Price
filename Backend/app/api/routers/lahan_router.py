from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.session import get_db
from app.crud import lahan as crud_lahan
from app.schemas import lahan as schemas_lahan
from app.services.idw_service import calculate_idw

router = APIRouter()


@router.get("/", response_model=List[schemas_lahan.LahanResponse])
async def get_lahan(max_jarak: Optional[float] = None, db: Session = Depends(get_db)):
    """
    Mengambil titik sampel lahan.
    Jika max_jarak diberikan, data akan disaring berdasarkan radius dari jalan tol.
    """
    if max_jarak is not None:
        return crud_lahan.get_lahan_by_jarak(db, max_jarak)
    return crud_lahan.get_all_lahan(db)


@router.post("/predict", response_model=schemas_lahan.PredictResponse)
async def predict_price(
    request: schemas_lahan.PredictRequest, db: Session = Depends(get_db)
):
    """
    Memprediksi estimasi harga lahan menggunakan algoritma IDW.
    """
    dataset = crud_lahan.get_all_lahan(db)
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset kosong untuk IDW.")

    try:
        # Panggil fungsi core logic bisnis kita di idw_service.py
        result = calculate_idw(
            target_x=request.latitude, 
            target_y=request.longitude, 
            dataset=dataset,
            radius_km=request.radius_km
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
