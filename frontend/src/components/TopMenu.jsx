import React from 'react';
import './TopMenu.css';

export default function TopMenu() {
  return (
    <header className="topo">
      <img src="../assets/logo.png" alt="Logo" className="logo" />
      <nav className="menu">
        <a href="#">Inicio</a>
        <div className="dropdown">
          <a className="dropbtn" href="#">Pacientes ▾</a>
          <div className="dropdown-content">
            <a href="#">Cadastrar paciente</a>
            <a href="#">Buscar paciente</a>
            <a href="#">Importar CSV</a>
            <a href="#">Exportar CSV</a>
          </div>
        </div>
        <a href="#">Agendas</a>
        <a href="#">Relatórios</a>
        <a href="#">Administração</a>
        <a href="#">Ferramentas</a>
        <a href="#">Configurações</a>
      </nav>
      <div className="usuario">Olá, Luzinete | <a href="#">Sair</a></div>
    </header>
  );
}