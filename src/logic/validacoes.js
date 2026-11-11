// Regras de validação (funções puras, sem acesso ao DOM).
// Por serem funções puras, podem ser testadas com Vitest sem abrir o navegador.

// Deixa o e-mail num formato padrão: sem espaços nas pontas e em minúsculas.
// Assim "Ana@Email.com " e "ana@email.com" são tratados como o mesmo e-mail.
export function normalizarEmail(email) {
  return String(email ?? '').trim().toLowerCase()
}

// Verifica se o e-mail tem um formato válido (algo@algo.algo).
// Retorna { ok: true } ou { ok: false, erro: 'mensagem' }.
export function validarEmail(email) {
  const valor = normalizarEmail(email)

  if (valor === '') {
    return { ok: false, erro: 'Informe o e-mail.' }
  }

  // Expressão regular simples: texto + @ + texto + . + texto, sem espaços
  const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)
  if (!formatoValido) {
    return { ok: false, erro: 'E-mail inválido. Use o formato nome@exemplo.com.' }
  }

  return { ok: true }
}

// RN02 – A senha deve ter no mínimo 8 caracteres, com letras E números.
// Retorna { ok: true } ou { ok: false, erro: 'mensagem' }.
export function validarSenha(senha) {
  const valor = String(senha ?? '')

  if (valor.length < 8) {
    return { ok: false, erro: 'A senha deve ter no mínimo 8 caracteres.' }
  }
  if (!/[a-zA-Z]/.test(valor)) {
    return { ok: false, erro: 'A senha deve conter pelo menos uma letra.' }
  }
  if (!/[0-9]/.test(valor)) {
    return { ok: false, erro: 'A senha deve conter pelo menos um número.' }
  }

  return { ok: true }
}

// RN01 – O e-mail deve ser único.
// Retorna true se já existe algum usuário com esse e-mail na lista.
export function emailJaCadastrado(email, usuarios) {
  const procurado = normalizarEmail(email)
  return (usuarios ?? []).some((u) => normalizarEmail(u.email) === procurado)
}
