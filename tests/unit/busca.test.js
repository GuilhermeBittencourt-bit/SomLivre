// Testes unitários da busca de músicas (RF03).
import { describe, it, expect } from 'vitest'
import { buscarMusicas } from '../../src/logic/busca.js'
import { catalogo } from '../../src/data/catalogo.js'

describe('RF03 – buscarMusicas', () => {
  // CT-011
  it('encontra músicas pelo nome do artista', () => {
    const resultado = buscarMusicas('Lia Moreno', catalogo)
    expect(resultado).toHaveLength(2)
    expect(resultado.every((m) => m.artista === 'Lia Moreno')).toBe(true)
  })

  // CT-012
  it('retorna lista vazia quando nada corresponde', () => {
    expect(buscarMusicas('xyz inexistente', catalogo)).toEqual([])
  })

  // CT-013
  it('não diferencia maiúsculas de minúsculas', () => {
    const minusculo = buscarMusicas('banda aurora', catalogo)
    const maiusculo = buscarMusicas('BANDA AURORA', catalogo)
    expect(minusculo).toHaveLength(2)
    expect(maiusculo).toEqual(minusculo)
  })

  // CT-014
  it('ignora acentos ("cancao" encontra "Canção do Vento")', () => {
    const resultado = buscarMusicas('cancao', catalogo)
    expect(resultado[0].titulo).toBe('Canção do Vento')
  })

  // CT-015
  it('busca também pelo nome do álbum', () => {
    expect(buscarMusicas('Órbita', catalogo)).toHaveLength(2)
  })

  // CT-016
  it('termo vazio devolve o catálogo inteiro', () => {
    expect(buscarMusicas('', catalogo)).toHaveLength(catalogo.length)
  })
})
