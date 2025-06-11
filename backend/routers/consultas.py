from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models
from ..database import SessionLocal
from datetime import datetime, timedelta


router = APIRouter(prefix="/consultas", tags=["Consultas"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def listar_consultas(db: Session = Depends(get_db)):
    consultas = db.query(models.Consulta).all()
    return [
        {
            "id": c.id,
            "title": f"{c.especialidade} - {c.telefone}",
            "start": f"{c.data}T{c.hora}",
            "end": f"{c.data}T{(datetime.combine(c.data, c.hora) + timedelta(minutes=15)).time()}",
            "status": c.status
        }
        for c in consultas
    ]

@router.delete("/{consulta_id}")
def deletar_consulta(consulta_id: int, db: Session = Depends(get_db)):
    consulta = db.query(models.Consulta).filter_by(id=consulta_id).first()
    if not consulta:
        raise HTTPException(status_code=404, detail="Consulta não encontrada")
    db.delete(consulta)
    db.commit()
    return {"mensagem": "Consulta removida com sucesso"}