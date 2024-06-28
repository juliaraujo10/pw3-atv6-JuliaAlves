import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardTurma from './CardTurma';
import { useHistory } from 'react-router-dom';

function ListaTurmas({ onEdit, onDelete }) {
  const [turmas, setTurmas] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // Buscar turmas do JSON Server
    axios.get('http://localhost:3001/tbl_turma')
      .then(response => setTurmas(response.data))
      .catch(error => console.error('Erro ao buscar turmas:', error));
  }, []);

  const handleEdit = (cod_turma) => {
    const turma = turmas.find(turma => turma.cod_turma === cod_turma);
    onEdit(turma);
    history.push('/formulario');
  };

  return (
    <div className="container">
      <h1>Lista de Turmas</h1>
      {turmas.map(turma => (
        <CardTurma
          key={turma.cod_turma}
          cod_turma={turma.cod_turma}
          sigla={turma.sigla}
          nome={turma.nome}
          onEdit={handleEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ListaTurmas;
