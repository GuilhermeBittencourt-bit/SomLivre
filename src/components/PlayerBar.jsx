// Barra do player fixa no rodapé – APENAS VISUAL na v0.1 (RF04).
// Mostra a música clicada; tocar/pausar/avançar de verdade fica para a Aula 04.

// Converte segundos em "m:ss" (ex.: 214 -> "3:34")
function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60)
  const seg = String(segundos % 60).padStart(2, '0')
  return `${min}:${seg}`
}

function PlayerBar({ musica }) {
  return (
    <footer className="player">
      <div className="player-info">
        {musica ? (
          <>
            <div className="capa-mini" style={{ background: musica.cor }}>♪</div>
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
          <button disabled aria-label="Voltar">⏮</button>
          <button disabled aria-label="Tocar" className="botao-play">▶</button>
          <button disabled aria-label="Avançar">⏭</button>
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
