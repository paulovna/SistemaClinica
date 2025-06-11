from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Conversa, MensagemRecebida, MensagemEnviada, Consulta
from datetime import datetime
import json
import traceback

router = APIRouter(prefix="/whatsapp", tags=["WhatsApp Bot"])

class MensagemInput(BaseModel):
    telefone: str
    mensagem: str

etapas = ["inicio", "nome", "especialidade", "data", "horario", "confirmacao"]

def obter_proxima_etapa(etapa_atual):
    if etapa_atual in etapas:
        idx = etapas.index(etapa_atual)
        if idx + 1 < len(etapas):
            return etapas[idx + 1]
    return None

@router.post("/simular")
def simular_resposta(dados: MensagemInput):
    try:
        db: Session = SessionLocal()
        telefone = dados.telefone
        msg = dados.mensagem.strip()

        db.add(MensagemRecebida(telefone=telefone, mensagem=msg))
        db.commit()

        conversa = db.query(Conversa).filter_by(telefone=telefone).first()
        if not conversa:
            conversa = Conversa(
                telefone=telefone,
                etapa_atual="inicio",
                respostas_parciais=json.dumps({}),
                ultima_interacao=datetime.utcnow()
            )
            db.add(conversa)
            db.commit()
            resposta = {
                "resposta": "👋 Olá, seja bem-vindo à Doctor Center Med! Como podemos ajudar?",
                "botoes": ["Marcar consulta", "Reagendar", "Cancelar", "Falar com atendente"]
            }
            db.add(MensagemEnviada(telefone=telefone, mensagem=resposta["resposta"]))
            db.commit()
            return resposta

        try:
            respostas = json.loads(conversa.respostas_parciais) if conversa.respostas_parciais else {}
        except json.JSONDecodeError:
            respostas = {}

        etapa = conversa.etapa_atual
        resposta = ""

        if etapa == "inicio":
            if any(p in msg.lower() for p in ["marcar", "1", "agendar", "consulta"]):
                conversa.etapa_atual = "nome"
                resposta = "Ótimo! Qual é o seu nome completo?"
            else:
                resposta = "Por favor, escolha uma opção:1️⃣ Marcar consulta 2️⃣ Reagendar 3️⃣ Cancelar"
        elif etapa == "nome":
            respostas["nome"] = msg
            conversa.etapa_atual = "especialidade"
            resposta = f"Perfeito, {msg}. Qual especialidade você deseja?"
        elif etapa == "especialidade":
            respostas["especialidade"] = msg
            conversa.etapa_atual = "data"
            resposta = "Certo. Para qual dia você gostaria da consulta? (ex: 28/05 ou sexta-feira)"
        elif etapa == "data":
            respostas["data"] = msg
            conversa.etapa_atual = "horario"
            resposta = (
                "Temos os seguintes horários disponíveis:"
                "1️⃣ 09:00 2️⃣ 10:30 3️⃣ 13:00 "
                "Digite o número do horário desejado."
            )
        elif etapa == "horario":
            horarios = {"1": "09:00", "2": "10:30", "3": "13:00"}
            if msg in horarios:
                respostas["hora"] = horarios[msg]
                conversa.etapa_atual = "confirmacao"

                try:
                    data_str = respostas["data"]
                    data_final = datetime.strptime(data_str, "%d/%m" if "/" in data_str else "%Y-%m-%d").replace(year=datetime.now().year).date()
                    hora_final = datetime.strptime(respostas["hora"], "%H:%M").time()
                    nova_consulta = Consulta(
                        paciente_nome=respostas["nome"],
                        telefone=telefone,
                        especialidade=respostas["especialidade"],
                        data=data_final,
                        hora=hora_final,
                        status="agendado"
                    )
                    db.add(nova_consulta)
                    db.commit()
                except Exception as e:
                    traceback.print_exc()
                    resposta = "❌ Houve um erro ao salvar a consulta. Por favor, tente novamente."
                    db.add(MensagemEnviada(telefone=telefone, mensagem=resposta))
                    db.commit()
                    return {"resposta": resposta}

                resposta = (
                    f"✅ Consulta marcada para {respostas['data']} às {respostas['hora']} com {respostas['especialidade']}."
                    f"Nos vemos em breve!"
                )
            else:
                resposta = "Por favor, digite uma opção válida: 1, 2 ou 3."
        else:
            resposta = "Encerramos o agendamento. Se quiser marcar outra consulta, envie 'marcar'."

        conversa.respostas_parciais = json.dumps(respostas)
        conversa.ultima_interacao = datetime.utcnow()
        db.commit()

        db.add(MensagemEnviada(telefone=telefone, mensagem=resposta))
        db.commit()

        return {"resposta": resposta}

    except Exception as e:
        traceback.print_exc()
        return {"resposta": "⚠️ Ocorreu um erro interno. Por favor, tente novamente mais tarde."}