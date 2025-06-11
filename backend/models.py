from sqlalchemy import Column, Integer, String, Date, Time, Boolean, ForeignKey, DateTime, Text
from .database import Base
from datetime import datetime

class Paciente(Base):
    __tablename__ = "pacientes"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    telefone = Column(String)
    data_nascimento = Column(Date)
    email = Column(String)

class Medico(Base):
    __tablename__ = "medicos"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    especialidade = Column(String)
    crm = Column(String)

class Agenda(Base):
    __tablename__ = "agenda"
    id = Column(Integer, primary_key=True, index=True)
    medico_id = Column(Integer, ForeignKey("medicos.id"))
    data = Column(Date)
    hora_inicio = Column(Time)
    hora_fim = Column(Time)
    disponivel = Column(Boolean, default=True)

class Consulta(Base):
    __tablename__ = "consultas"
    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("pacientes.id"), nullable=True)
    medico_id = Column(Integer, ForeignKey("medicos.id"), nullable=True)
    paciente_nome = Column(String, nullable=True)
    telefone = Column(String, nullable=True)
    especialidade = Column(String, nullable=True)
    data = Column(Date)
    hora = Column(Time)
    status = Column(String, default="agendado")


# Modelos do bot
class Conversa(Base):
    __tablename__ = 'conversas'
    id = Column(Integer, primary_key=True)
    telefone = Column(String, unique=True, index=True)
    etapa_atual = Column(String)
    respostas_parciais = Column(Text)
    ultima_interacao = Column(DateTime, default=datetime.utcnow)

class MensagemRecebida(Base):
    __tablename__ = 'mensagens_recebidas'
    id = Column(Integer, primary_key=True)
    telefone = Column(String)
    mensagem = Column(Text)
    data_hora = Column(DateTime, default=datetime.utcnow)

class MensagemEnviada(Base):
    __tablename__ = 'mensagens_enviadas'
    id = Column(Integer, primary_key=True)
    telefone = Column(String)
    mensagem = Column(Text)
    data_hora = Column(DateTime, default=datetime.utcnow)