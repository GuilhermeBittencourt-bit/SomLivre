// Regra de busca no catálogo (RF03) – função pura.

// Deixa o texto em minúsculas e sem acentos, para comparar "Canção" com "cancao".
// normalize('NFD') separa a letra do acento; o replace remove os acentos.
export function normalizarTexto(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

// Busca músicas cujo título, artista OU álbum contenham o termo.
// Ignora maiúsculas/minúsculas e acentos. Termo vazio devolve o catálogo inteiro.
export function buscarMusicas(termo, catalogo) {
  const termoNormalizado = normalizarTexto(termo)
  const lista = catalogo ?? []

  if (termoNormalizado === '') {
    return lista
  }

  return lista.filter((musica) =>
    [musica.titulo, musica.artista, musica.album].some((campo) =>
      normalizarTexto(campo).includes(termoNormalizado),
    ),
  )
}
