
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function ModalAgendamento({ slot, onClose, onAgendado }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [erro, setErro] = useState('');

  const validar = () => {
    if (!nome || !telefone || !especialidade) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
    return true;
  };

  const aplicarMascaraTelefone = (valor) => {
    valor = valor.replace(/\D/g, '');
    if (valor.length <= 10) {
      return valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  };

  const handleTelefoneChange = (e) => {
    const valor = e.target.value;
    setTelefone(aplicarMascaraTelefone(valor));
  };

  const enviarAgendamento = async () => {
    if (!validar()) return;
    try {
      await axios.post('http://localhost:8000/agendamentos/manual', {
        paciente_nome: nome,
        telefone,
        especialidade,
        data: slot.data,
        hora: slot.hora
      });
      onAgendado();
    } catch (error) {
      console.error('Erro ao agendar:', error);
      setErro('Erro ao agendar. Tente novamente.');
    }
  };

  const modalContent = (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        padding: '2rem',
        width: '100%',
        maxWidth: '500px'
      }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#1d4ed8', marginBottom: '1.5rem' }}>
          📅 Novo Agendamento
        </h2>

        {erro && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{erro}</div>}

        <div style={{ marginBottom: '1rem' }}>
          <label>Nome completo:</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do paciente"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Telefone:</label>
          <input
            value={telefone}
            onChange={handleTelefoneChange}
            placeholder="(11) 91234-5678"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label>Especialidade:</label>
          <input
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            placeholder="Ex: Clínica Geral, Ginecologia..."
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button onClick={onClose} style={{ padding: '0.5rem 1rem', backgroundColor: '#ccc', borderRadius: '6px' }}>
            Cancelar
          </button>
          <button onClick={enviarAgendamento} style={{ padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: 'white', borderRadius: '6px' }}>
            Confirmar Agendamento
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default ModalAgendamento;
