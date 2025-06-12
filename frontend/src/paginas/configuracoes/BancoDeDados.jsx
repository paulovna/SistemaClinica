import React, { useEffect, useState } from 'react';
import PaginaBase from '../../layout/PaginaBase';
import './BancoDeDados.css';

export default function BancoDeDados() {
  const [estrutura, setEstrutura] = useState({});
  const [abertas, setAbertas] = useState({});

  useEffect(() => {
    fetch('http://localhost:8000/banco-de-dados')
      .then(res => res.json())
      .then(data => {
        setEstrutura(data);
        const inicial = Object.keys(data).reduce((acc, tabela) => {
          acc[tabela] = false;
          return acc;
        }, {});
        setAbertas(inicial);
      });
  }, []);

  const alternarTabela = (tabela) => {
    setAbertas(prev => ({ ...prev, [tabela]: !prev[tabela] }));
  };

  return (
    <PaginaBase>
      <div className="banco-container">
        <h2>Visualização do Banco de Dados</h2>
        {Object.keys(estrutura).map((tabela) => (
          <div key={tabela} className="tabela-bloco">
            <button className="tabela-titulo" onClick={() => alternarTabela(tabela)}>
              {abertas[tabela] ? '📂' : '📁'} {tabela}
            </button>
            {abertas[tabela] && (
              <table className="estrutura-tabela">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Obrigatório</th>
                    <th>Chave Primária</th>
                  </tr>
                </thead>
                <tbody>
                  {estrutura[tabela].map((coluna, index) => (
                    <tr key={index}>
                      <td>{coluna.nome}</td>
                      <td>{coluna.tipo}</td>
                      <td>{coluna.notnull ? 'Sim' : 'Não'}</td>
                      <td>{coluna.chave_primaria ? 'Sim' : 'Não'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </PaginaBase>
  );
}
