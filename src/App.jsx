// Componente raiz: decide qual tela mostrar (Login, Cadastro ou Home).
// Não usamos biblioteca de rotas: um estado "tela" guarda a tela atual.
import { useState } from 'react'
import { lerSessao, salvarSessao, encerrarSessao } from './data/storage.js'
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Home from './pages/Home.jsx'

function App() {
  // Se já existe sessão salva no localStorage, o usuário entra direto na Home
  const [usuario, setUsuario] = useState(() => lerSessao())
  const [tela, setTela] = useState(usuario ? 'home' : 'login')

  // Chamado pelas telas de Login/Cadastro quando dá certo
  function entrar(usuarioLogado) {
    salvarSessao(usuarioLogado)
    setUsuario(lerSessao()) // lê de volta já sem o hash da senha
    setTela('home')
  }

  // RF02 – logout
  function sair() {
    encerrarSessao()
    setUsuario(null)
    setTela('login')
  }

  if (tela === 'home' && usuario) {
    return <Home usuario={usuario} onSair={sair} />
  }
  if (tela === 'cadastro') {
    return <Cadastro onCadastrar={entrar} onIrParaLogin={() => setTela('login')} />
  }
  return <Login onEntrar={entrar} onIrParaCadastro={() => setTela('cadastro')} />
}

export default App
