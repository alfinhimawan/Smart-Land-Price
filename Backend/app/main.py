from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings


def get_application():
    app = FastAPI(
        title=settings.PROJECT_NAME,
        openapi_url=f"{settings.API_V1_STR}/openapi.json"
    )

    # Memasang CORS Middleware agar React Frontend bisa melakukan fetch
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],  # Mengizinkan semua method HTTP
        allow_headers=["*"],  # Mengizinkan semua header
    )

    # TODO: Include routers from api endpoints here
    # from app.api.endpoints import lahan
    # app.include_router(lahan.router)

    return app


app = get_application()


@app.get("/")
def root():
    return {"message": "Welcome to Smart Land Price API (IDW Backend)"}
