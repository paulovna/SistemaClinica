from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import date
from ..database import SessionLocal
from .. import models

router = APIRouter(prefix="/pacientes", tags=["Pacientes"])

# Modelo Pydantic para entrada de dados
class PacienteCreate(BaseModel):
    nome: str
    telefone: str
    data_nascimento: date
    email: str

# Dependência para obter sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Rota para criar um paciente
@router.post("/")
def criar_paciente(paciente: PacienteCreate, db: Session = Depends(get_db)):
    novo_paciente = models.Paciente(**paciente.dict())
    db.add(novo_paciente)
    db.commit()
    db.refresh(novo_paciente)
    return novo_paciente
