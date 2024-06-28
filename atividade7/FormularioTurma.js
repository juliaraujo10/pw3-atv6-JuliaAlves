import React, { useState, useEffect } from 'react';

function FormularioTurma({ onCadastro, turma }) {
  const [formData, setFormData] = useState({
    cod_turma: '',
    sigla: '',
    nome: '',
  });

  useEffect(() => {
    if (turma) {
      setFormData(turma);
    }
  }, [turma]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCadastro(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Código da Turma:</label>
        <input
          type="text"
          name="cod_turma"
          value={formData.cod_turma}
          onChange={handleChange}
          readOnly={!!turma}
        />
      </div>
      <div>
        <label>Sigla:</label>
        <input
          type="text"
          name="sigla"
          value={formData.sigla}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
        />
      </div>
      <button type="submit">{turma ? 'Editar' : 'Cadastrar'}</button>
    </form>
  );
}

export default FormularioTurma;
