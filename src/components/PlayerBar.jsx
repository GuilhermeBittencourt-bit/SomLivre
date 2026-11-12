// Barra do player fixa no rodapé – APENAS VISUAL na v0.1 (RF04).
// Mostra a música clicada; tocar/pausar/avançar de verdade fica para a Aula 04.

// Converte segundos em "m:ss" (ex.: 214 -> "3:34")
function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60)
  const seg = String(segundos % 60).padStart(2, '0')
  return `${min}:${seg}`
}

// Ícone simples desenhado em SVG (sem emojis nem imagens externas)
function Icone({ d }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

function PlayerBar({ musica }) {
  return (
    <footer className="player">
      <div className="player-info">
        {musica ? (
          <>
            <div className="capa-mini" style={{ background: musica.cor }}>{musica.titulo[0]}</div>
            <div>
              <strong>{musica.titulo}</strong>
              <span className="card-artista">{musica.artista}</span>
            </div>
          </>
        ) : (
          <span className="card-artista">Escolha uma música</span>
        )}
      </div>

      <div className="player-controles">
        <div className="botoes">
          <button disabled aria-label="Voltar"><Icone d="M6 6h2v12H6zM20 6v12l-9-6z" /></button>
          <button disabled aria-label="Tocar" className="botao-play"><Icone d="M8 5v14l11-7z" /></button>
          <button disabled aria-label="Avançar"><Icone d="M16 6h2v12h-2zM4 6v12l9-6z" /></button>
        </div>
        <div className="progresso">
          <span>0:00</span>
          <div className="barra"><div className="barra-preenchida" /></div>
          <span>{musica ? formatarTempo(musica.duracao) : '0:00'}</span>
        </div>
      </div>

      <div className="player-extra" />
    </footer>
  )
}

export default PlayerBar
