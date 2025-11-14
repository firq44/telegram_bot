from datetime import datetime
from typing import List
import uuid

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import Column, DateTime, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, sessionmaker

# --- DB setup ---

SQLALCHEMY_DATABASE_URL = "sqlite:///./plates.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class PlateModel(Base):
    __tablename__ = "plates"

    id = Column(String, primary_key=True, index=True)
    value = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)


Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- Schemas ---

class Plate(BaseModel):
    id: str
    value: str
    created_at: datetime

    class Config:
        orm_mode = True


class PlateCreate(BaseModel):
    value: str


# --- App ---

app = FastAPI(title="Plate Registry API")

# CORS — сюда потом подставишь домен фронта
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/plates", response_model=List[Plate])
def list_plates(db: Session = Depends(get_db)):
    plates = db.query(PlateModel).order_by(PlateModel.created_at.desc()).all()
    return plates


@app.post("/plates", response_model=Plate)
def add_plate(data: PlateCreate, db: Session = Depends(get_db)):
    value = data.value.strip().upper()
    if not value:
        raise HTTPException(status_code=400, detail="Empty plate value")

    plate = PlateModel(
        id=str(uuid.uuid4()),
        value=value,
        created_at=datetime.utcnow(),
    )
    db.add(plate)
    db.commit()
    db.refresh(plate)
    return plate


@app.delete("/plates/{plate_id}")
def delete_plate(plate_id: str, db: Session = Depends(get_db)):
    plate = db.query(PlateModel).filter(PlateModel.id == plate_id).first()
    if not plate:
        raise HTTPException(status_code=404, detail="Plate not found")

    db.delete(plate)
    db.commit()
    return {"ok": True}
