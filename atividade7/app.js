import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import FormularioTurma from './FormularioTurma';
import ListaTurmas from './ListaTurmas';
import axios from 'axios';

function App() {
  const [turmas, setTurmas] = useState([]);
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [editandoTurma, setEditandoTurma] = useState(null);
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:3001/tbl_turma')
      .then(response => setTurmas(response.data))
      .catch(error => console.error('Erro ao buscar turmas:', error));
  }, []);

  const handleCadastro = (dadosTurma) => {
    axios.post('http://localhost:3001/tbl_turma', dadosTurma)
      .then(response => {
        setTurmas([...turmas, response.data]);
        setCadastroSucesso(true);
        setTimeout(() => setCadastroSucesso(false), 3000);
      })
      .catch(error => {
        console.error('Erro ao cadastrar turma:', error);
        setCadastroSucesso(false);
      });
  };

  const handleEdicao = (dadosTurma) => {
    axios.put(`http://localhost:3001/tbl_turma/${dadosTurma.cod_turma}`, dadosTurma)
      .then(response => {
        setTurmas(turmas.map(turma => (turma.cod_turma === dadosTurma.cod_turma ? response.data : turma)));
        setCadastroSucesso(true);
        setTimeout(() => setCadastroSucesso(false), 3000);
        setEditandoTurma(null);
        history.push('/lista-turmas');
      })
      .catch(error => {
        console.error('Erro ao editar turma:', error);
        setCadastroSucesso(false);
      });
  };

  const handleDelete = (cod_turma) => {
    axios.delete(`http://localhost:3001/tbl_turma/${cod_turma}`)
      .then(() => {
        setTurmas(turmas.filter(turma => turma.cod_turma !== cod_turma));
      })
      .catch(error => console.error('Erro ao excluir turma:', error));
  };

  return (
    <Router>
      <div className="container">
        <h1>Sistema de Cadastro de Turmas</h1>
        {cadastroSucesso && <div className="mensagem-sucesso">Operação realizada com sucesso!</div>}
        <Switch>
          <Route path="/formulario">
            <FormularioTurma onCadastro={editandoTurma ? handleEdicao : handleCadastro} turma={editandoTurma} />
          </Route>
          <Route path="/lista-turmas">
            <ListaTurmas turmas={turmas} onEdit={setEditandoTurma} onDelete={handleDelete} />
          </Route>
          <Redirect from="/" to="/formulario" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
