import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import FormularioTurma from './FormularioTurma';
import ListaTurmas from './ListaTurmas';
import axios from 'axios';

function App() {
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  const handleCadastro = (dadosTurma) => {
    axios.post('http://localhost:3001/tbl_turma', dadosTurma)
      .then(response => {
        console.log('Cadastro realizado com sucesso:', response.data);
        setCadastroSucesso(true);
        setTimeout(() => {
          setCadastroSucesso(false);
        }, 3000); // Exibir a mensagem por 3 segundos
      })
      .catch(error => {
        console.error('Erro ao cadastrar turma:', error);
        setCadastroSucesso(false);
      });
  };

  return (
    <Router>
      <div className="container">
        <h1>Sistema de Cadastro de Turmas</h1>
        {cadastroSucesso && <div className="mensagem-sucesso">Cadastro realizado com sucesso!</div>}
        <Switch>
          <Route path="/formulario">
            <FormularioTurma onCadastro={handleCadastro} />
          </Route>
          <Route path="/lista-turmas">
            <ListaTurmas />
          </Route>
          <Redirect from="/" to="/formulario" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
