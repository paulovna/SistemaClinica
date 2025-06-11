import React from 'react';
import TopMenu from '../components/TopMenu';

export default function PaginaBase({ children }) {
  return (
    <div className="pagina-base">
      <TopMenu />
      <main className="conteudo">
        {children}
      </main>
    </div>
  );
}