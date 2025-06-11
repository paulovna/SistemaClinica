from fastapi import APIRouter
from sqlalchemy import inspect
from ..database import engine

router = APIRouter()

@router.get("/banco-de-dados")
def visualizar_tabelas():
    inspector = inspect(engine)
    tabelas = inspector.get_table_names()
    estrutura = {}
    for tabela in tabelas:
        colunas = inspector.get_columns(tabela)
        estrutura[tabela] = [
            {
                "nome": coluna["name"],
                "tipo": str(coluna["type"]),
                "nullable": coluna["nullable"],
                "chave_primaria": coluna["primary_key"]
            } for coluna in colunas
        ]
    return estrutura