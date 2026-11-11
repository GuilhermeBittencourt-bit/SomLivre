// Testes unitários das regras de validação (RN01 e RN02).
// Cada "it" é um caso de teste. "expect" compara o resultado obtido com o esperado.
import { describe, it, expect } from 'vitest'
import { validarSenha, validarEmail, emailJaCadastrado } from '../../src/logic/validacoes.js'

describe('RN02 – validarSenha', () => {
  // CT-001
  it('aceita senha com 8+ caracteres, letras e números', () => {
    expect(validarSenha('musica123')).toEqual({ ok: true })
  })

  // CT-002
  it('recusa senha com menos de 8 caracteres', () => {
    const resultado = validarSenha('abc12')
    expect(resultado.ok).toBe(false)
    expect(resultado.erro).toBe('A senha deve ter no mínimo 8 caracteres.')
  })

  // CT-003
  it('recusa senha sem número', () => {
    const resultado = validarSenha('somenteletras')
    expect(resultado.ok).toBe(false)
    expect(resultado.erro).toBe('A senha deve conter pelo menos um número.')
  })

  // CT-004
  it('recusa senha sem letra', () => {
    const resultado = validarSenha('12345678')
    expect(resultado.ok).toBe(false)
    expect(resultado.erro).toBe('A senha deve conter pelo menos uma letra.')
  })
})

describe('validarEmail', () => {
  // CT-005
  it('aceita e-mail no formato correto', () => {
    expect(validarEmail('ana@exemplo.com')).toEqual({ ok: true })
  })

  // CT-006
  it('recusa e-mail sem @', () => {
    expect(validarEmail('anaexemplo.com').ok).toBe(false)
  })

  // CT-007
  it('recusa e-mail vazio', () => {
    expect(validarEmail('').erro).toBe('Informe o e-mail.')
  })
})

describe('RN01 – emailJaCadastrado', () => {
  const usuarios = [{ nome: 'Ana Teste', email: 'ana@exemplo.com', senhaHash: 'x' }]

  // CT-008
  it('detecta e-mail duplicado', () => {
    expect(emailJaCadastrado('ana@exemplo.com', usuarios)).toBe(true)
  })

  // CT-009
  it('detecta duplicado mesmo com maiúsculas e espaços', () => {
    expect(emailJaCadastrado('  ANA@Exemplo.com ', usuarios)).toBe(true)
  })

  // CT-010
  it('permite e-mail que ainda não foi cadastrado', () => {
    expect(emailJaCadastrado('bruno@exemplo.com', usuarios)).toBe(false)
  })
})
