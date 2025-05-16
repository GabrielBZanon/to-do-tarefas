function obterTodasTarefas() {
    const tarefas = localStorage.getItem('tarefas');
    return tarefas ? JSON.parse(tarefas) : [];
}

function cadastrarTarefa(tarefa) {
    const tarefas = obterTodasTarefas();
    
    tarefa.id = gerarId();
    tarefa.dataCadastro = new Date().toISOString();
    tarefa.status = "A Fazer";
    
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    
    return tarefa.id;
}

function obterTarefaPorId(id) {
    const tarefas = obterTodasTarefas();
    return tarefas.find(t => t.id === id);
}

function atualizarTarefa(id, dadosAtualizados) {
    const tarefas = obterTodasTarefas();
    const index = tarefas.findIndex(t => t.id === id);
    
    if (index !== -1) {
        dadosAtualizados.id = id;
        dadosAtualizados.dataCadastro = tarefas[index].dataCadastro;
        
        tarefas[index] = dadosAtualizados;
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        return true;
    }
    
    return false;
}

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

function excluirTarefa(id) {
    const tarefas = obterTodasTarefas();
    const novasTarefas = tarefas.filter(t => t.id !== id);
    localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
    return true;
}