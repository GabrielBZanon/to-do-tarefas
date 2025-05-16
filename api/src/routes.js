const express = require('express');
const routes = express.Router();

const Tarefa = require('./controllers/controller_tarefa');
const Usuario = require('./controllers/controller_usuario');

routes.get('/', (req, res) => {
    res.send('API Respondendo...');
});

routes.post('/tarefa', Tarefa.cadastrarTarefa);
routes.get('/tarefa', Tarefa.listarTarefas);
routes.put('/tarefa/:id', Tarefa.atualizarStatus);
routes.delete('/tarefa/:id', Tarefa.excluirTarefa);

routes.post('/usuario', Usuario.cadastrarUsuario);
routes.get('/usuario', Usuario.listarUsuarios);
routes.put('/usuario/:id', Usuario.atualizarUsuario);
routes.delete('/usuario/:id', Usuario.excluirUsuario);


module.exports = routes;
