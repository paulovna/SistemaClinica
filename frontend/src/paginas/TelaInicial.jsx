import React from 'react';
import PaginaBase from '../layout/PaginaBase';
import './TelaInicial.css';

export default function TelaInicial() {
  return (
    <PaginaBase>
      <h2>Bom dia, Luzinete!</h2>
      <div className="cards">
        <section className="pacientes">
          <div className="card azul">
            <div className="icone">&#128100;</div>
            <div className="numero">233</div>
            <div className="descricao">pacientes cadastrados</div>
          </div>
          <div className="card azul">
            <div className="icone">&#128100;&#10133;</div>
            <div className="numero">39</div>
            <div className="descricao">novos pacientes este mês</div>
            <div className="legenda">13 homens • 26 mulheres</div>
          </div>
        </section>
        <section className="agendamentos">
          <div className="card azul-claro">
            <div className="icone">&#128197;</div>
            <div className="numero">0</div>
            <div className="descricao">agendamentos para hoje</div>
          </div>
          <div className="card verde">
            <div className="icone">&#10003;</div>
            <div className="numero">0</div>
            <div className="descricao">agendamentos confirmados para amanhã</div>
          </div>
        </section>
      </div>
    </PaginaBase>
  );
}