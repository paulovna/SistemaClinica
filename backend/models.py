from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Paciente(Base):
    __tablename__ = 'pacientes'
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    data_nascimento = Column(Date)
    cpf = Column(String)
    rg = Column(String)
    sexo_biologico = Column(String)
    telefone = Column(String)
    celular = Column(String)
    email = Column(String)
    profissao = Column(String)
    local_trabalho = Column(String)
    telefone_comercial = Column(String)
    foto = Column(String)

    endereco = relationship("Endereco", back_populates="paciente", uselist=False)
    convenio = relationship("Convenio", back_populates="paciente", uselist=False)
    responsavel = relationship("Responsavel", back_populates="paciente", uselist=False)

class Endereco(Base):
    __tablename__ = 'enderecos'
    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey('pacientes.id'))
    cep = Column(String)
    logradouro = Column(String)
    numero = Column(String)
    bairro = Column(String)
    cidade = Column(String)
    estado = Column(String)

    paciente = relationship("Paciente", back_populates="endereco")

class Convenio(Base):
    __tablename__ = 'convenios'
    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey('pacientes.id'))
    convenio = Column(String)
    plano = Column(String)
    inscricao = Column(String)
    validade = Column(Date)

    paciente = relationship("Paciente", back_populates="convenio")

class Responsavel(Base):
    __tablename__ = 'responsaveis'
    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey('pacientes.id'))
    nome = Column(String)
    parentesco = Column(String)
    cpf = Column(String)
    rg = Column(String)
    celular = Column(String)

    paciente = relationship("Paciente", back_populates="responsavel")