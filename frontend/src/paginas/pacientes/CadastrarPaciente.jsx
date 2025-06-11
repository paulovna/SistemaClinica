import React from 'react';
import PaginaBase from '../../layout/PaginaBase';
import './CadastrarPaciente.css';

export default function CadastrarPaciente() {
  return (
    <PaginaBase>
      <div className="cadastro-paciente">
        <div className="cabecalho">
          <h2>Ficha de Cadastro de Paciente</h2>
          <select className="clinica">
            <option>Doctor Center Med</option>
          </select>
          <button className="btn-cadastrar">Cadastrar</button>
        </div>

        <form className="formulario">
          <fieldset className="grupo">
            <legend>Dados Pessoais</legend>
            <div className="linha">
              <div><label>Nome*</label><input type="text" /></div>
              <div><label>Data de Nascimento*</label><input type="date" /></div>
            </div>
            <div className="linha">
              <div><label>CPF</label><input type="text" /></div>
              <div><label>RG</label><input type="text" /></div>
            </div>
            <div className="linha">
              <div><label>Sexo biológico*</label><select><option>Selecione</option></select></div>
              <div><label><input type="checkbox" /> Gênero (opcional)</label></div>
            </div>
            <div className="linha">
              <div><label>Telefone</label><input type="text" /></div>
              <div><label>Celular e Operadora</label><input type="text" /></div>
              <div><label>Estado civil</label><select><option>Selecione</option></select></div>
            </div>
            <div className="linha">
              <div><label>E-mail</label><input type="email" /></div>
              <div><label>Profissão</label><input type="text" /></div>
            </div>
            <div className="linha">
              <div><label>Local de Trabalho</label><input type="text" /></div>
              <div><label>Telefone Comercial</label><input type="text" /></div>
            </div>
            <div className="linha">
              <div><label>Foto</label><input type="file" /></div>
            </div>
          </fieldset>

          <fieldset className="grupo">
            <legend>Convênio</legend>
            <div className="linha">
              <div><label>Convênio</label><select><option>Particular</option></select></div>
              <div><label>Plano</label><input type="text" /></div>
            </div>
            <div className="linha">
              <div><label>Inscrição</label><input type="text" /></div>
              <div><label>Validade</label><input type="date" /></div>
            </div>
          </fieldset>

          <fieldset className="grupo">
            <legend>1º Responsável</legend>
            <div className="linha">
              <div><label>Nome</label><input type="text" /></div>
              <div><label>Parentesco</label><input type="text" /></div>
            </div>
            <div className="linha">
              <div><label>CPF</label><input type="text" /></div>
              <div><label>RG</label><input type="text" /></div>
              <div><label>Celular</label><input type="text" /></div>
            </div>
          </fieldset>

          <fieldset className="grupo">
            <legend>Endereço</legend>
            <div className="linha">
              <div><label>CEP</label><input type="text" /></div>
            </div>
            <div className="linha">
              <div><label>Endereço</label><input type="text" /></div>
              <div><label>Número/Complemento</label><input type="text" /></div>
            </div>
            <div className="linha">
              <div><label>Bairro</label><input type="text" /></div>
              <div><label>Cidade</label><input type="text" /></div>
              <div><label>Estado</label><select><option>Selecione o Estado</option></select></div>
            </div>
          </fieldset>

          <fieldset className="grupo">
            <legend>Outros</legend>
            <div className="linha">
              <div><label>Indicado por</label><input type="text" /></div>
            </div>
            <div className="linha">
              <div style={{ flex: '1' }}>
                <label>Observações</label>
                <textarea rows="4" style={{ width: '100%' }}></textarea>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </PaginaBase>
  );
}