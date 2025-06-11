import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VisualizarTabelas() {
  const [tabelas, setTabelas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/visualizar/tabelas")
      .then(res => res.json())
      .then(data => setTabelas(data))
      .catch(err => console.error("Erro ao carregar tabelas:", err));
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #1a1a2e, #16213e)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '4rem 1rem',
      color: '#e0e7ff'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        marginBottom: '2rem',
        color: '#60a5fa',
      }}>
        Tabelas do Banco de Dados
      </h1>

      <div style={{
        background: 'rgba(255, 255, 255, 0.04)',
        borderRadius: '24px',
        padding: '2rem',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
      }}>
        {tabelas.map((tabela, i) => (
          <button
            key={i}
            onClick={() => navigate(`/visualizar-tabelas/${tabela.tabela}`)}
            style={{
              padding: '1rem 1.5rem',
              fontSize: '1.2rem',
              fontWeight: '500',
              color: '#ffffff',
              background: 'linear-gradient(to right, #3b82f6, #6366f1)',
              borderRadius: '1.5rem',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 0.9}
            onMouseLeave={e => e.currentTarget.style.opacity = 1}
          >
            {tabela.tabela}
          </button>
        ))}
      </div>
    </div>
  );
}
