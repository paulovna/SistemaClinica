import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DetalheTabela() {
  const { nome } = useParams();
  const [detalhes, setDetalhes] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/visualizar/tabelas/${nome}`)
      .then(res => res.json())
      .then(data => setDetalhes(data))
      .catch(err => console.error(err));
  }, [nome]);

  if (!detalhes) {
    return <div style={{ padding: '2rem', color: 'white' }}>Carregando...</div>;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #1a1a2e, #16213e)',
      color: '#e0e7ff',
      padding: '3rem 2rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#60a5fa', marginBottom: '1.5rem' }}>{detalhes.tabela}</h1>
      <p style={{ marginBottom: '2rem' }}>Total de linhas: <strong>{detalhes.linhas}</strong></p>

      <h2 style={{ marginBottom: '0.5rem' }}>Estrutura da Tabela</h2>
      <table style={tableStyle}>
        <thead>
          <tr style={headerStyle}>
            <th style={th}>Coluna</th>
            <th style={th}>Tipo</th>
            <th style={th}>Nulo</th>
            <th style={th}>Default</th>
            <th style={th}>PK</th>
          </tr>
        </thead>
        <tbody>
          {detalhes.colunas.map((col, i) => (
            <tr key={i} style={i % 2 === 0 ? rowEven : rowOdd}>
              <td style={td}>{col.nome}</td>
              <td style={td}>{col.tipo}</td>
              <td style={td}>{col.nulo ? 'Sim' : 'Não'}</td>
              <td style={td}>{col.default ?? '-'}</td>
              <td style={td}>{col.chave_primaria ? 'Sim' : 'Não'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: '3rem', marginBottom: '0.5rem' }}>Registros da Tabela</h2>
      <table style={tableStyle}>
        <thead>
          <tr style={headerStyle}>
            {detalhes.colunas.map((col, i) => (
              <th key={i} style={th}>{col.nome}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {detalhes.registros.map((linha, i) => (
            <tr key={i} style={i % 2 === 0 ? rowEven : rowOdd}>
              {detalhes.colunas.map((col, j) => (
                <td key={j} style={td}>{linha[col.nome]?.toString() ?? '-'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '2rem'
};

const headerStyle = {
  background: '#1e3a8a'
};

const th = {
  padding: '0.75rem',
  border: '1px solid #334155',
  fontWeight: '600',
  textAlign: 'left',
  color: '#f1f5f9'
};

const td = {
  padding: '0.75rem',
  border: '1px solid #334155',
  color: '#f8fafc'
};

const rowEven = {
  background: '#1e40af'
};

const rowOdd = {
  background: '#1d4ed8'
};
