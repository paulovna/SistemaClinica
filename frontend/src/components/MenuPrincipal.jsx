import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MenuPrincipal() {
  const navigate = useNavigate();

  const botoes = [
    { label: '📅 Acessar Agenda', rota: '/agenda' },
    { label: '🗂️ Banco de Dados', rota: '/visualizar-tabelas' },
    { label: '👥 Pacientes', rota: '/pacientes' },
    { label: '🧑‍⚕️ Médicos', rota: '/medicos' },
    { label: '📝 Consultas', rota: '/consultas' },
    { label: '⚙️ Configurações', rota: '/configuracoes' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem 4rem',
      color: 'white'
    }}>
      <h1 style={{
        fontSize: '2.8rem',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#60a5fa',
        marginTop: '-1.5rem',
      }}>
        Menu Principal
      </h1>

      <div style={{
        background: 'rgba(255, 255, 255, 0.06)',
        borderRadius: '24px',
        padding: '3rem 2rem',
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        boxShadow: '0 16px 40px rgba(0,0,0,0.25)'
      }}>
        {botoes.map((botao, i) => (
          <button
            key={i}
            onClick={() => navigate(botao.rota)}
            style={{
              width: '100%',
              padding: '1.2rem 1.5rem',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              background: 'linear-gradient(to right, #00c9ff, #92fe9d)',
              border: 'none',
              borderRadius: '32px',
              cursor: 'pointer',
              transition: 'all 0.25s ease-in-out',
              textShadow: '0 1px 1px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 0.92}
            onMouseLeave={e => e.currentTarget.style.opacity = 1}
          >
            {botao.label}
          </button>
        ))}
      </div>
    </div>
  );
}
