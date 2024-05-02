import React from 'react';

function CardTurma({ cod_turma, sigla, nome }) {
  return (
    <div className="card">
      <h2>Código: {cod_turma}</h2>
      <p>Sigla: {sigla}</p>
      <p>Nome: {nome}</p>
    </div>
  );
}

export default CardTurma;
