# 🏥 Sistema de Agendamento - Clínica Doctor Center Med

Este é um sistema completo de agendamento para uma clínica médica, com visualização estilo Google Calendar, integração ao WhatsApp, interface moderna e painel de administração. O projeto é estruturado em frontend (React) e backend (FastAPI), funcionando em rede local.

---

## 📁 Estrutura do Projeto

```
Projeto/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── whatsapp_db.py
│   └── routers/
│       ├── agendamentos.py
│       ├── consultas.py
│       ├── medicos.py
│       ├── pacientes.py
│       └── database_viewer.py
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── app.css
│       └── components/
│           ├── MenuPrincipal.jsx
│           ├── CalendarView.jsx
│           ├── VisualizarTabelas.jsx
│           └── DetalheTabela.jsx
```

---

## 🚀 Tecnologias Utilizadas

| Camada     | Tecnologias                                 |
|------------|----------------------------------------------|
| Frontend   | React, Vite, TailwindCSS, FullCalendar       |
| Backend    | FastAPI, SQLAlchemy, SQLite, Uvicorn         |
| Outros     | Integração com WhatsApp (simulada via JSON)  |

---

## 🧩 Funcionalidades

- ✅ Agendamento 24h com interface estilo calendário
- ✅ Visualização de agenda com slots de 15 minutos
- ✅ Modal de agendamento e popup com detalhes
- ✅ Painel de banco de dados interno com tabelas e registros
- ✅ Listagem de médicos, pacientes e consultas
- ✅ Integração WhatsApp simulada para automatização de mensagens
- ✅ Interface visual moderna e responsiva

---

## 📦 Como executar localmente

### Backend (FastAPI)

```bash
cd backend
uvicorn main:app --reload
```

Acesse: `http://localhost:8000`

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Acesse: `http://localhost:5173`

---

## 🔐 Segurança e Privacidade

- Toda execução roda em rede local.
- Integrações com WhatsApp podem ser conectadas à API da Meta.
- Pronto para futura autenticação de usuários (admin, médico, recepção).

---

## 📌 Futuras Expansões

- Controle de presença automático
- Confirmação de consultas via WhatsApp
- Painel de relatórios e indicadores
- Integração com sistemas de pagamento
- Módulo de login e permissões

---

## 👨‍💻 Desenvolvido por

**Paulo Vinícius Nunes de Aguiar**  
Assessor de Controle Interno & Gestor da Doctor Center Med  
📍 São Bernardo do Campo, SP  
📞 (11) 98527-2293

---

## 📝 Licença

Projeto privado de uso exclusivo da Clínica Doctor Center Med.