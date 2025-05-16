// Função para obter todas as tarefas do LocalStorage
function obterTodasTarefas() {
  const tarefas = localStorage.getItem('tarefas');
  return tarefas ? JSON.parse(tarefas) : [];
}

// Função para cadastrar uma nova tarefa
function cadastrarTarefa(tarefa) {
  const tarefas = obterTodasTarefas();
  
  // Adiciona ID
  tarefa.id = gerarId();
  
  tarefas.push(tarefa);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  
  return tarefa.id;
}

// Função para obter uma tarefa por ID
function obterTarefaPorId(id) {
  const tarefas = obterTodasTarefas();
  return tarefas.find(t => t.id === id);
}

// Função para atualizar uma tarefa existente
function atualizarTarefa(id, dadosAtualizados) {
  const tarefas = obterTodasTarefas();
  const index = tarefas.findIndex(t => t.id === id);
  
  if (index !== -1) {
      // Mantém o ID e a data de cadastro originais
      dadosAtualizados.id = id;
      dadosAtualizados.dataCadastro = tarefas[index].dataCadastro;
      
      // Atualiza a tarefa
      tarefas[index] = dadosAtualizados;
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
      return true;
  }
  
  return false;
}

// Função para atualizar apenas o status de uma tarefa
function atualizarStatusTarefa(id, novoStatus) {
  const tarefas = obterTodasTarefas();
  const index = tarefas.findIndex(t => t.id === id);
  
  if (index !== -1) {
      tarefas[index].status = novoStatus;
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
      return true;
  }
  
  return false;
}

// Função para excluir uma tarefa
function excluirTarefa(id) {
  const tarefas = obterTodasTarefas();
  const novasTarefas = tarefas.filter(t => t.id !== id);
  localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
  return true;
}