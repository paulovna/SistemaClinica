from fastapi import FastAPI
from backend.database import Base, engine
from backend.routers import pacientes, agendamentos, consultas, database_viewer
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",  # origem do seu frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # libera acesso ao frontend
    allow_credentials=True,
    allow_methods=["*"],              # permite todos os métodos (POST, GET, etc)
    allow_headers=["*"],              # permite todos os headers (Content-Type etc)
)

app.include_router(pacientes.router)
app.include_router(agendamentos.router)
app.include_router(consultas.router)
app.include_router(database_viewer.router)