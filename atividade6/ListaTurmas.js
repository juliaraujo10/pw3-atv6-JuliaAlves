import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardTurma from './CardTurma';

function ListaTurmas() {
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    // Buscar turmas do JSON Server
    axios.get('http://localhost:3001/tbl_turma')
      .then(response => setTurmas(response.data))
      .catch(error => console.error('Erro ao buscar turmas:', error));
  }, []);

  return (
    <div className="container">
      <h1>Lista de Turmas</h1>
      {turmas.map(turma => (
        <CardTurma
          key={turma.id}
          cod_turma={turma.cod_turma}
          sigla={turma.sigla}
          nome={turma.nome}
        />
      ))}
    </div>
  );
}

export default ListaTurmas;
