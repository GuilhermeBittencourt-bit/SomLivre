// Tela de Cadastro (RF01). Mostra o erro embaixo do campo que está errado.
import { useState } from 'react'
import { cadastrarUsuario } from '../logic/auth.js'
import { lerUsuarios, salvarUsuarios } from '../data/storage.js'

function Cadastro({ onCadastrar, onIrParaLogin }) {
  const [dados, setDados] = useState({ nome: '', email: '', senha: '' })
  // erro = { campo: 'senha', mensagem: '...' } ou null
  const [erro, setErro] = useState(null)

  // Atualiza só o campo que mudou (nome, email ou senha)
  function alterar(evento) {
    setDados({ ...dados, [evento.target.name]: evento.target.value })
  }

  async function handleSubmit(evento) {
    evento.preventDefault()
    const usuarios = lerUsuarios()
    const resultado = await cadastrarUsuario(dados, usuarios)

    if (!resultado.ok) {
      setErro({ campo: resultado.campo, mensagem: resultado.erro })
      return
    }

    salvarUsuarios([...usuarios, resultado.usuario])
    onCadastrar(resultado.usuario) // já entra logado após o cadastro
  }

  // Ajuda a mostrar a mensagem e a borda vermelha só no campo com erro
  const temErro = (campo) => erro?.campo === campo

  return (
    <div className="tela-auth">
      <form className="cartao-auth" onSubmit={handleSubmit} noValidate>
        <h1 className="logo">SomLivre</h1>
        <h2>Criar conta</h2>

        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" value={dados.nome} onChange={alterar}
          className={temErro('nome') ? 'campo-erro' : ''} />
        {temErro('nome') && <p className="erro">{erro.mensagem}</p>}

        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" value={dados.email} onChange={alterar}
          className={temErro('email') ? 'campo-erro' : ''} />
        {temErro('email') && <p className="erro">{erro.mensagem}</p>}

        <label htmlFor="senha">Senha</label>
        <input id="senha" name="senha" type="password" value={dados.senha} onChange={alterar}
          className={temErro('senha') ? 'campo-erro' : ''} />
        {temErro('senha')
          ? <p className="erro">{erro.mensagem}</p>
          : <p className="dica">Mínimo 8 caracteres, com letras e números.</p>}

        <button type="submit" className="botao-principal">Cadastrar</button>

        <p className="troca-tela">
          Já tem conta?{' '}
          <button type="button" className="link" onClick={onIrParaLogin}>Entrar</button>
        </p>
      </form>
    </div>
  )
}

export default Cadastro
