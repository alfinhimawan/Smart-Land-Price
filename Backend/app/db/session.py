from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# Engine database postgresql
engine = create_engine(settings.SQLALCHEMY_DATABASE_URI, pool_pre_ping=True)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class untuk declarative models
Base = declarative_base()


# Dependency untuk FastAPI (mendapatkan session database per request)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
