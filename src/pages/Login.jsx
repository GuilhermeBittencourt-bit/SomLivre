// Tela de Login (RF02). A regra fica em logic/auth.js; aqui só cuidamos do formulário.
import { useState } from 'react'
import { autenticar } from '../logic/auth.js'
import { lerUsuarios } from '../data/storage.js'

function Login({ onEntrar, onIrParaCadastro }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  async function handleSubmit(evento) {
    evento.preventDefault() // impede o navegador de recarregar a página
    const resultado = await autenticar(email, senha, lerUsuarios())
    if (resultado.ok) {
      onEntrar(resultado.usuario)
    } else {
      setErro(resultado.erro)
    }
  }

  return (
    <div className="tela-auth">
      <form className="cartao-auth" onSubmit={handleSubmit} noValidate>
        <h1 className="logo">♪ SomLivre</h1>
        <h2>Entrar</h2>

        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="senha">Senha</label>
        <input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />

        {erro && <p className="erro">{erro}</p>}

        <button type="submit" className="botao-principal">Entrar</button>

        <p className="troca-tela">
          Não tem conta?{' '}
          <button type="button" className="link" onClick={onIrParaCadastro}>Cadastre-se</button>
        </p>
      </form>
    </div>
  )
}

export default Login
