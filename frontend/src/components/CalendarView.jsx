
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import './calendar.css';
import ModalAgendamento from './ModalAgendamento';

function CalendarView() {
  const [events, setEvents] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [filtroEsp, setFiltroEsp] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [slotSelecionado, setSlotSelecionado] = useState(null);

  useEffect(() => {
    buscarEventos();
  }, []);

  const buscarEventos = () => {
    axios.get('http://localhost:8000/consultas')
      .then(response => {
        setEvents(response.data);
        const especialidadesUnicas = Array.from(new Set(response.data.map(e => e.title.split(" - ")[0])));
        setEspecialidades(especialidadesUnicas);
      })
      .catch(error => {
        console.error('Erro ao buscar consultas:', error);
      });
  };

  const exportarCSV = () => {
    const linhas = [["Especialidade", "Telefone", "Data", "Hora", "Status"]];
    events.forEach(e => {
      const data = e.start.split("T")[0];
      const hora = e.start.split("T")[1];
      linhas.push([e.title.split(" - ")[0], e.title.split(" - ")[1], data, hora, e.status]);
    });
    const csv = linhas.map(l => l.join(";")).join("\n");
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "agenda.csv";
    link.click();
  };

  const eventosFiltrados = filtroEsp
    ? events.filter(e => e.title.toLowerCase().includes(filtroEsp.toLowerCase()))
    : events;

  const eventClassNames = (arg) => {
    if (arg.event.extendedProps.status === 'agendado') return ['event-agendado'];
    if (arg.event.extendedProps.status === 'confirmado') return ['event-confirmado'];
    if (arg.event.extendedProps.status === 'cancelado') return ['event-cancelado'];
    return [];
  };

  const aoClicarNoHorario = (info) => {
    setSlotSelecionado({
      data: info.dateStr.split('T')[0],
      hora: info.dateStr.split('T')[1]?.substring(0, 5) || '00:00'
    });
    setModalAberto(true);
  };

  const aoClicarNoEvento = (clickInfo) => {
    const evento = clickInfo.event;
    const resumo = `📋 Consulta:\n${evento.title}\n${evento.start.toLocaleString()}\nStatus: ${evento.extendedProps.status}`;

    const confirmDiv = document.createElement('div');
    confirmDiv.style.position = 'fixed';
    confirmDiv.style.top = '0';
    confirmDiv.style.left = '0';
    confirmDiv.style.width = '100vw';
    confirmDiv.style.height = '100vh';
    confirmDiv.style.backgroundColor = 'rgba(0,0,0,0.6)';
    confirmDiv.style.zIndex = '9999';
    confirmDiv.style.display = 'flex';
    confirmDiv.style.alignItems = 'center';
    confirmDiv.style.justifyContent = 'center';

    const content = document.createElement('div');
    
    content.style.background = '#ffffff';
    content.style.border = '1px solid #e2e8f0';
    content.style.fontFamily = 'Segoe UI, sans-serif';
    content.style.color = '#1f2937';
    content.style.borderRadius = '24px';
    content.style.padding = '3rem 4rem';
    content.style.boxShadow = '0 16px 48px rgba(0,0,0,0.1)';
    content.style.width = '650px';
    content.style.minHeight = '320px';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.alignItems = 'center';
    content.style.justifyContent = 'center';
    content.style.textAlign = 'center';
    content.style.gap = '2rem';

    const p = document.createElement('p');
    p.style.whiteSpace = 'pre-wrap';
    p.style.fontSize = '1.6rem';
    p.style.fontWeight = '500';
    p.style.marginBottom = '2.5rem';
    p.style.marginTop = '1rem';
    p.innerText = resumo;

    const btnGroup = document.createElement('div');
    btnGroup.style.marginTop = '1.5rem';
    btnGroup.style.display = 'flex';
    btnGroup.style.justifyContent = 'space-between';
    btnGroup.style.gap = '1rem';

    const okBtn = document.createElement('button');
    okBtn.innerText = 'OK';
    okBtn.style.padding = '0.5rem 1rem';
    okBtn.style.backgroundColor = '#3b82f6';
    okBtn.style.fontWeight = '600';
    okBtn.style.fontSize = '1.2rem';
    okBtn.style.padding = '0.85rem 2rem';
    okBtn.style.cursor = 'pointer';
    okBtn.style.transition = 'background-color 0.2s';
    okBtn.onmouseenter = () => okBtn.style.backgroundColor = '#2563eb';
    okBtn.onmouseleave = () => okBtn.style.backgroundColor = '#3b82f6';
    okBtn.style.color = 'white';
    okBtn.style.border = 'none';
    okBtn.style.borderRadius = '6px';
    okBtn.onclick = () => document.body.removeChild(confirmDiv);

    const cancelBtn = document.createElement('button');
    cancelBtn.innerText = '🗑️ Cancelar';
    cancelBtn.style.padding = '0.5rem 1rem';
    cancelBtn.style.backgroundColor = '#ef4444';
    cancelBtn.style.fontWeight = '600';
    cancelBtn.style.fontSize = '1.2rem';
    cancelBtn.style.padding = '0.85rem 2rem';
    cancelBtn.style.cursor = 'pointer';
    cancelBtn.style.transition = 'background-color 0.2s';
    cancelBtn.onmouseenter = () => cancelBtn.style.backgroundColor = '#dc2626';
    cancelBtn.onmouseleave = () => cancelBtn.style.backgroundColor = '#ef4444';
    cancelBtn.style.color = 'white';
    cancelBtn.style.border = 'none';
    cancelBtn.style.borderRadius = '6px';
    cancelBtn.onclick = () => {
      document.body.removeChild(confirmDiv);
      const confirmar = window.confirm('⚠️ Tem certeza que deseja excluir esta consulta?');
      if (confirmar) {
        axios.delete(`http://localhost:8000/consultas/${evento.id}`)
          .then(() => {
            alert('Consulta removida com sucesso!');
            buscarEventos();
          })
          .catch(() => {
            alert('Erro ao remover consulta.');
          });
      }
    };

    btnGroup.appendChild(okBtn);
    btnGroup.appendChild(cancelBtn);
    content.appendChild(p);
    content.appendChild(btnGroup);
    confirmDiv.appendChild(content);
    confirmDiv.style.opacity = '0';
    confirmDiv.style.transform = 'scale(0.9)';
    document.body.appendChild(confirmDiv);
    setTimeout(() => {
      confirmDiv.style.transition = 'all 0.3s ease';
      confirmDiv.style.opacity = '1';
      confirmDiv.style.transform = 'scale(1)';
    }, 10);
  };

  return (
    <>
      
    <div className="bg-gray-100 border-b border-gray-300 px-6 py-2 flex items-center justify-between rounded-t-xl shadow-sm">
      <div className="flex items-center space-x-4 text-sm text-gray-700 font-semibold tracking-wide">
        <span>📁 Arquivo</span>
        <span>📊 Relatórios</span>
        <span>⚙️ Configurações</span>
        <span>❓Ajuda</span>
      </div>
      <div className="text-sm text-gray-500 font-medium">Versão 13</div>
    </div>
    
    <div className="bg-gray-50 p-6 rounded-xl shadow-xl max-w-screen-xl mx-auto mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">📅 Painel de Agendamentos</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <select
            value={filtroEsp}
            onChange={(e) => setFiltroEsp(e.target.value)}
            className="border border-gray-300 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">🔍 Filtrar por especialidade</option>
            {especialidades.map((esp, i) => (
              <option key={i} value={esp}>{esp}</option>
            ))}
          </select>

          <button
            onClick={exportarCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-medium"
          >
            ⬇️ Exportar Agenda
          </button>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale="pt-br"
        slotMinTime="07:00:00"
        slotMaxTime="20:00:00"
        slotDuration="00:15:00"
        allDaySlot={false}
        height="auto"
        dateClick={aoClicarNoHorario}
        eventClick={aoClicarNoEvento}
        events={eventosFiltrados}
        eventClassNames={eventClassNames}
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        buttonText={{
          today: 'Hoje',
          month: 'Mês',
          week: 'Semana',
          day: 'Dia'
        }}
        titleFormat={{ year: 'numeric', month: 'long', day: 'numeric' }}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
      />

      {modalAberto && (
        <ModalAgendamento
          slot={slotSelecionado}
          onClose={() => setModalAberto(false)}
          onAgendado={() => {
            setModalAberto(false);
            buscarEventos();
          }}
        />
      )}
    </div>
    </>
  );
}

export default CalendarView;
