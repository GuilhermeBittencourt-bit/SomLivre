// Regras de cadastro e login (RF01, RF02).
// Não acessam o DOM nem o localStorage: recebem a lista de usuários por parâmetro
// e devolvem um objeto { ok, erro, campo, usuario }. Quem salva é a camada de dados.
import { validarEmail, validarSenha, confirmarSenha, emailJaCadastrado, normalizarEmail } from './validacoes.js'

// RNF02 – Gera o hash SHA-256 da senha (nunca guardamos a senha "pura").
// crypto.subtle existe nos navegadores modernos e no Node 20+ (usado pelo Vitest).
// É assíncrona (async), por isso as funções que a usam também são.
export async function gerarHash(texto) {
  const bytes = new TextEncoder().encode(texto)
  const hashBuffer = await crypto.subtle.digest('SHA-256', bytes)
  // Converte os bytes do hash para texto hexadecimal (ex.: "9f86d0...")
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

// RF01 – Cadastra um novo usuário.
// dados = { nome, email, senha, confirmacao }, usuarios = lista atual de usuários.
// O campo "campo" diz qual input da tela está errado (nome, email, senha ou confirmacao).
export async function cadastrarUsuario(dados, usuarios) {
  const nome = String(dados?.nome ?? '').trim()
  const email = normalizarEmail(dados?.email)
  const senha = dados?.senha ?? ''

  if (nome === '') {
    return { ok: false, campo: 'nome', erro: 'Informe o nome.' }
  }

  const resultadoEmail = validarEmail(email)
  if (!resultadoEmail.ok) {
    return { ok: false, campo: 'email', erro: resultadoEmail.erro }
  }

  // RN01 – e-mail único
  if (emailJaCadastrado(email, usuarios)) {
    return { ok: false, campo: 'email', erro: 'Este e-mail já está cadastrado.' }
  }

  // RN02 – regras da senha
  const resultadoSenha = validarSenha(senha)
  if (!resultadoSenha.ok) {
    return { ok: false, campo: 'senha', erro: resultadoSenha.erro }
  }

  // As duas senhas digitadas precisam ser iguais
  const resultadoConfirmacao = confirmarSenha(senha, dados?.confirmacao ?? '')
  if (!resultadoConfirmacao.ok) {
    return { ok: false, campo: 'confirmacao', erro: resultadoConfirmacao.erro }
  }

  const usuario = {
    id: Date.now().toString(), // id simples, suficiente para a v0.1
    nome,
    email,
    senhaHash: await gerarHash(senha),
  }

  return { ok: true, usuario }
}

// RF02 – Autentica (login) comparando o hash da senha digitada com o hash salvo.
export async function autenticar(email, senha, usuarios) {
  const emailNormalizado = normalizarEmail(email)

  if (emailNormalizado === '' || !senha) {
    return { ok: false, erro: 'Informe e-mail e senha.' }
  }

  const usuario = (usuarios ?? []).find((u) => u.email === emailNormalizado)
  const hashDigitado = await gerarHash(senha)

  // Mensagem genérica de propósito: não revelamos se o erro foi no e-mail ou na senha
  if (!usuario || usuario.senhaHash !== hashDigitado) {
    return { ok: false, erro: 'E-mail ou senha incorretos.' }
  }

  return { ok: true, usuario }
}
