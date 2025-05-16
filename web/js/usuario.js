function gerarId() {
    return Math.random().toString(36).substr(2, 9);
}

function obterTodosUsuarios() {
    const usuarios = localStorage.getItem('usuarios');
    return usuarios ? JSON.parse(usuarios) : [];
}

function cadastrarUsuario(usuario) {
    const usuarios = obterTodosUsuarios();
    
    const emailExistente = usuarios.some(u => u.email === usuario.email);
    if (emailExistente) {
        throw new Error('Este e-mail já está cadastrado!');
    }

    usuario.id = gerarId();
    usuario.dataCadastro = new Date().toISOString();
    
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    return usuario.id;
}

function obterUsuarioPorId(id) {
    const usuarios = obterTodosUsuarios();
    return usuarios.find(u => u.id === id);
}