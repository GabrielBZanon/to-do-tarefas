document.addEventListener('DOMContentLoaded', function() {
    // Página de gerenciamento de tarefas
    if (document.getElementById('a-fazer-column')) {
        carregarTarefas();
    }
    
    // Página de cadastro de tarefas
    if (document.getElementById('tarefaForm')) {
        carregarUsuariosParaSelect();
        
        const urlParams = new URLSearchParams(window.location.search);
        const tarefaId = urlParams.get('id');
        
        if (tarefaId) {
            carregarTarefaParaEdicao(tarefaId);
        }
    }
    
    // Página de cadastro de usuários
    if (document.getElementById('usuarioForm')) {
        const usuarioForm = document.getElementById('usuarioForm');
        
        usuarioForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            
            if (!email.includes('@') || !email.includes('.')) {
                document.getElementById('email').classList.add('is-invalid');
                return;
            }
            
            try {
                const usuarioId = cadastrarUsuario({ nome, email });
                
                if (usuarioId) {
                    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                    successModal.show();
                    usuarioForm.reset();
                }
            } catch (error) {
                alert(error.message);
            }
        });
    }
    
    // Página de cadastro de tarefas (formulário)
    if (document.getElementById('tarefaForm')) {
        const tarefaForm = document.getElementById('tarefaForm');
        const submitBtn = document.getElementById('submitBtn');
        
        tarefaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const descricao = document.getElementById('descricao').value;
            const setor = document.getElementById('setor').value;
            const usuarioId = document.getElementById('usuario').value;
            const prioridade = document.getElementById('prioridade').value;
            const tarefaId = document.getElementById('tarefaId').value;
            
            const tarefaData = {
                descricao,
                setor,
                usuarioId,
                prioridade,
                status: 'A Fazer'
            };
            
            if (tarefaId) {
                atualizarTarefa(tarefaId, tarefaData);
            } else {
                cadastrarTarefa(tarefaData);
            }
            
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
});

function carregarTarefas() {
    const tarefas = obterTodasTarefas();
    const usuarios = obterTodosUsuarios();
    
    document.getElementById('a-fazer-column').innerHTML = '';
    document.getElementById('fazendo-column').innerHTML = '';
    document.getElementById('pronto-column').innerHTML = '';
    
    tarefas.forEach(tarefa => {
        const usuario = usuarios.find(u => u.id === tarefa.usuarioId);
        const usuarioNome = usuario ? usuario.nome : 'Usuário não encontrado';
        
        const card = criarCardTarefa(tarefa, usuarioNome);
        
        switch(tarefa.status) {
            case 'A Fazer':
                document.getElementById('a-fazer-column').appendChild(card);
                break;
            case 'Fazendo':
                document.getElementById('fazendo-column').appendChild(card);
                break;
            case 'Pronto':
                document.getElementById('pronto-column').appendChild(card);
                break;
        }
    });
}

function criarCardTarefa(tarefa, usuarioNome) {
    const card = document.createElement('div');
    card.className = `card task-card mb-3 ${tarefa.prioridade.toLowerCase()}`;
    
    let priorityClass;
    switch(tarefa.prioridade) {
        case 'Baixa': priorityClass = 'badge-low'; break;
        case 'Média': priorityClass = 'badge-medium'; break;
        case 'Alta': priorityClass = 'badge-high'; break;
    }
    
    card.innerHTML = `
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
                <h6 class="card-title">${tarefa.descricao}</h6>
                <span class="badge ${priorityClass} priority-badge">${tarefa.prioridade}</span>
            </div>
            <p class="card-text mb-1"><small class="text-muted">Setor: ${tarefa.setor}</small></p>
            <p class="card-text mb-2"><small class="text-muted">Usuário: ${usuarioNome}</small></p>
            
            <div class="d-flex justify-content-between align-items-center">
                <select class="form-select form-select-sm status-select" style="width: auto;">
                    <option value="A Fazer" ${tarefa.status === 'A Fazer' ? 'selected' : ''}>A Fazer</option>
                    <option value="Fazendo" ${tarefa.status === 'Fazendo' ? 'selected' : ''}>Fazendo</option>
                    <option value="Pronto" ${tarefa.status === 'Pronto' ? 'selected' : ''}>Pronto</option>
                </select>
                <button class="btn btn-sm btn-outline-primary update-status-btn">Atualizar</button>
            </div>
            
            <div class="d-flex justify-content-end mt-2 gap-2">
                <a href="cadastro_tarefa.html?id=${tarefa.id}" class="btn btn-sm btn-outline-secondary">Editar</a>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${tarefa.id}">Excluir</button>
            </div>
        </div>
    `;
    
    const updateBtn = card.querySelector('.update-status-btn');
    const statusSelect = card.querySelector('.status-select');
    
    updateBtn.addEventListener('click', function() {
        const novoStatus = statusSelect.value;
        atualizarStatusTarefa(tarefa.id, novoStatus);
        carregarTarefas();
    });
    
    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            excluirTarefa(this.getAttribute('data-id'));
            carregarTarefas();
        }
    });
    
    return card;
}

function carregarUsuariosParaSelect() {
    const usuarios = obterTodosUsuarios();
    const select = document.getElementById('usuario');
    
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    usuarios.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario.id;
        option.textContent = usuario.nome;
        select.appendChild(option);
    });
}

function carregarTarefaParaEdicao(tarefaId) {
    const tarefa = obterTarefaPorId(tarefaId);
    
    if (tarefa) {
        document.getElementById('tarefaId').value = tarefa.id;
        document.getElementById('descricao').value = tarefa.descricao;
        document.getElementById('setor').value = tarefa.setor;
        document.getElementById('usuario').value = tarefa.usuarioId;
        document.getElementById('prioridade').value = tarefa.prioridade;
        document.getElementById('submitBtn').textContent = 'Atualizar';
    }
}