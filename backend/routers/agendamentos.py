from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import date, time
from .. import models
from ..database import SessionLocal

router = APIRouter(prefix="/agendamentos", tags=["Agendamentos"])

# Dependência de banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Modelo para agendamento com paciente_id e medico_id (uso atual)
class AgendamentoCreate(BaseModel):
    paciente_id: int
    medico_id: int
    data: date
    hora: time

@router.post("/")
def agendar_consulta(agendamento: AgendamentoCreate, db: Session = Depends(get_db)):
    consulta_existente = db.query(models.Consulta).filter_by(
        medico_id=agendamento.medico_id,
        data=agendamento.data,
        hora=agendamento.hora
    ).first()

    if consulta_existente:
        raise HTTPException(status_code=400, detail="Horário já ocupado para esse médico.")

    nova_consulta = models.Consulta(
        paciente_id=agendamento.paciente_id,
        medico_id=agendamento.medico_id,
        data=agendamento.data,
        hora=agendamento.hora,
        status="agendado"
    )
    db.add(nova_consulta)
    db.commit()
    db.refresh(nova_consulta)
    return nova_consulta

# Modelo alternativo para agendamento manual via painel (sem id)
class AgendamentoManual(BaseModel):
    paciente_nome: str
    telefone: str
    especialidade: str
    data: date
    hora: time

@router.post("/manual")
def agendar_manual(ag: AgendamentoManual, db: Session = Depends(get_db)):
    nova = models.Consulta(
        paciente_nome=ag.paciente_nome,
        telefone=ag.telefone,
        especialidade=ag.especialidade,
        data=ag.data,
        hora=ag.hora,
        status="agendado"
    )
    db.add(nova)
    db.commit()
    db.refresh(nova)
    return nova