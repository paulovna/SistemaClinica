from fastapi import APIRouter
from backend.database import engine
from sqlalchemy import inspect, text

router = APIRouter()

@router.get("/visualizar/tabelas")
def visualizar_tabelas():
    insp = inspect(engine)
    return [{"tabela": nome} for nome in insp.get_table_names()]

@router.get("/visualizar/tabelas/{nome}")
def visualizar_detalhes(nome: str):
    insp = inspect(engine)

    if nome not in insp.get_table_names():
        return {"erro": "Tabela não encontrada"}

    try:
        colunas = insp.get_columns(nome)
        pk = insp.get_pk_constraint(nome)["constrained_columns"]

        with engine.connect() as conn:
            linhas = conn.execute(text(f"SELECT COUNT(*) FROM {nome}")).scalar()
            dados = conn.execute(text(f"SELECT * FROM {nome}")).fetchall()
            nomes_colunas = [col["name"] for col in colunas]

        return {
            "tabela": nome,
            "linhas": linhas,
            "colunas": [
                {
                    "nome": col["name"],
                    "tipo": str(col["type"]),
                    "nulo": col.get("nullable", True),
                    "default": col.get("default"),
                    "chave_primaria": col["name"] in pk
                }
                for col in colunas
            ],
            "registros": [dict(zip(nomes_colunas, row)) for row in dados]
        }

    except Exception as e:
        return {"erro": f"Erro ao processar tabela: {str(e)}"}
