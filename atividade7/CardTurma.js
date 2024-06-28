import React from 'react';

function CardTurma({ cod_turma, sigla, nome, onEdit, onDelete }) {
  return (
    <div className="card">
      <h2>Código: {cod_turma}</h2>
      <p>Sigla: {sigla}</p>
      <p>Nome: {nome}</p>
      <button onClick={() => onEdit(cod_turma)}>Editar</button>
      <button onClick={() => onDelete(cod_turma)}>Excluir</button>
    </div>
  );
}

export default CardTurma;
