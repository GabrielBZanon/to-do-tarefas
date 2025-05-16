// Função para gerar IDs únicos
function gerarId() {
  return Math.random().toString(36).substr(2, 9);
}

// Função para obter todos os usuários do LocalStorage
function obterTodosUsuarios() {
  const usuarios = localStorage.getItem('usuarios');
  return usuarios ? JSON.parse(usuarios) : [];
}

// Função para cadastrar um novo usuário
function cadastrarUsuario(usuario) {
  const usuarios = obterTodosUsuarios();
  
  // Verifica se o e-mail já está cadastrado
  const emailExistente = usuarios.some(u => u.email === usuario.email);
  if (emailExistente) {
      alert('Este e-mail já está cadastrado!');
      return null;
  }
  
  // Adiciona ID e data de cadastro
  usuario.id = gerarId();
  usuario.dataCadastro = new Date().toISOString();
  
  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
  return usuario.id;
}

// Função para obter um usuário por ID
function obterUsuarioPorId(id) {
  const usuarios = obterTodosUsuarios();
  return usuarios.find(u => u.id === id);
}