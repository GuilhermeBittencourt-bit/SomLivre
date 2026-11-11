// Leitura e escrita no localStorage (usuários e sessão).
// É a ÚNICA parte do código que mexe no localStorage; a lógica (src/logic) não sabe que ele existe.

const CHAVE_USUARIOS = 'streaming:usuarios'
const CHAVE_SESSAO = 'streaming:sessao'

// Lê a lista de usuários. Se não houver nada (ou o dado estiver corrompido), devolve [].
export function lerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) ?? []
  } catch {
    return []
  }
}

// Salva a lista inteira de usuários.
export function salvarUsuarios(usuarios) {
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios))
}

// Guarda quem está logado (sem o hash da senha).
export function salvarSessao(usuario) {
  const { id, nome, email } = usuario
  localStorage.setItem(CHAVE_SESSAO, JSON.stringify({ id, nome, email }))
}

// Lê o usuário logado, ou null se ninguém estiver logado.
export function lerSessao() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_SESSAO))
  } catch {
    return null
  }
}

// Logout: apaga a sessão.
export function encerrarSessao() {
  localStorage.removeItem(CHAVE_SESSAO)
}
