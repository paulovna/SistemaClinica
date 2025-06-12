from fastapi import APIRouter, HTTPException
import sqlalchemy
from sqlalchemy.exc import SQLAlchemyError
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


@router.get("/tabela/{nome}")
def ler_tabela(nome: str):
    try:
        with engine.connect() as conn:
            result = conn.execute(sqlalchemy.text(f"SELECT * FROM {nome}"))
            dados = [dict(row) for row in result.mappings()]  # aqui está a correção
            colunas = list(dados[0].keys()) if dados else []
        return {"colunas": colunas, "dados": dados}
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=f"Erro ao acessar tabela: {e}")