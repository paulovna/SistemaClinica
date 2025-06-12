import React, { useEffect, useState } from 'react';
import PaginaBase from '../../layout/PaginaBase';

export default function TabelasBD() {
  const [tabelas, setTabelas] = useState(['pacientes', 'medicos', 'agenda', 'consultas']); // Você pode atualizar essa lista conforme as tabelas do seu banco
  const [tabelaSelecionada, setTabelaSelecionada] = useState(tabelas[0]);
  const [colunas, setColunas] = useState([]);
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!tabelaSelecionada) return;

    setCarregando(true);
    setErro(null);
    fetch(`http://localhost:8000/tabela/${tabelaSelecionada}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ao carregar tabela: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setColunas(data.colunas || []);
        setDados(data.dados || []);
        setCarregando(false);
      })
      .catch((error) => {
        setErro(error.message);
        setCarregando(false);
      });
  }, [tabelaSelecionada]);

  return (
    <PaginaBase>
      <div style={{ padding: '2rem' }}>
        <h2>Visualização da Tabela</h2>

        <label>
          Selecione a tabela:{' '}
          <select value={tabelaSelecionada} onChange={(e) => setTabelaSelecionada(e.target.value)}>
            {tabelas.map((nome) => (
              <option key={nome} value={nome}>
                {nome}
              </option>
            ))}
          </select>
        </label>

        {carregando && <p>Carregando dados...</p>}

        {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}

        {!carregando && !erro && (
          <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', marginTop: '1rem', width: '100%' }}>
            <thead>
              <tr>
                {colunas.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dados.length === 0 && (
                <tr>
                  <td colSpan={colunas.length}>Nenhum dado disponível</td>
                </tr>
              )}
              {dados.map((linha, idx) => (
                <tr key={idx}>
                  {colunas.map((col) => (
                    <td key={col}>{linha[col]?.toString() || ''}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PaginaBase>
  );
}
