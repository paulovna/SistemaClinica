import TelaInicial from "./paginas/TelaInicial";
import CalendarView from "./components/CalendarView";
import VisualizarTabelas from "./components/VisualizarTabelas";
import DetalheTabela from "./components/DetalheTabela";

import React from 'react';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TelaInicial />} />
      <Route path="/agenda" element={<CalendarView />} />
      <Route path="/visualizar-tabelas" element={<VisualizarTabelas />} />
      <Route path="/visualizar-tabelas/:nome" element={<DetalheTabela />} />
    </Routes>
  );
}