import TelaInicial from "./paginas/TelaInicial";
import CalendarView from "./components/CalendarView";
import VisualizarTabelas from "./components/VisualizarTabelas";
import DetalheTabela from "./components/DetalheTabela";
import BancoDeDados from './paginas/configuracoes/BancoDeDados';
import TabelasBD from './paginas/configuracoes/TabelasBD';
import CadastrarPaciente from './paginas/pacientes/CadastrarPaciente';

import React from 'react';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TelaInicial />} />
      <Route path="/agenda" element={<CalendarView />} />
      <Route path="/visualizar-tabelas" element={<VisualizarTabelas />} />
      <Route path="/visualizar-tabelas/:nome" element={<DetalheTabela />} />
      <Route path="/banco-de-dados" element={<BancoDeDados />} />
      <Route path="/tabelasbd" element={<TabelasBD />} />
      <Route path="/cadastrar-paciente" element={<CadastrarPaciente />} />
    </Routes>
  );
}