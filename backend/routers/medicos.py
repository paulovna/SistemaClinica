from fastapi import APIRouter
from ..models import Medico

router = APIRouter(prefix="/medicos", tags=["Médicos"])

@router.get("/")
def listar_medicos():
    # Aqui você retornaria a lista de médicos — simulando por enquanto
    return [{"nome": "Dra. Ana", "especialidade": "Clínico Geral", "crm": "123456"}]
