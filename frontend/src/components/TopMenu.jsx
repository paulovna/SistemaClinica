import React from 'react';
import './TopMenu.css';

export default function TopMenu() {
  return (
    <header className="topo">
      <img src="../assets/logo.png" alt="Logo" className="logo" />
      <nav className="menu">
        <a href="#">Inicio</a>
        <div className="dropdown">
          <a className="dropbtn" href="">Pacientes ▾</a>
          <div className="dropdown-content">
            <a href="/cadastrar-paciente">Cadastrar paciente</a>
            <a href="#">Buscar paciente</a>
            <a href="#">Importar CSV</a>
            <a href="#">Exportar CSV</a>
          </div>
        </div>
        <a href="#">Agendas</a>
        <a href="#">Relatórios</a>
        <a href="#">Administração</a>
        <a href="#">Ferramentas</a>
        <div className="dropdown">
          <a className="dropbtn" href="">Configurações ▾</a>
          <div className="dropdown-content">
            <a href="/banco-de-dados">Banco de Dados</a>
            <a href="/tabelasbd">Tabelas</a>
          </div>
        </div>
      </nav>
      <div className="usuario">Olá, Luzinete | <a href="#">Sair</a></div>
    </header>
  );
}