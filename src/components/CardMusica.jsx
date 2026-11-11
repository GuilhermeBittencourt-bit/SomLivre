// Card de uma música. A "capa" é só um quadrado colorido (sem imagens reais).
function CardMusica({ musica, onClick }) {
  return (
    <button className="card" onClick={onClick}>
      <div className="capa" style={{ background: musica.cor }}>♪</div>
      <strong className="card-titulo">{musica.titulo}</strong>
      <span className="card-artista">{musica.artista}</span>
    </button>
  )
}

export default CardMusica
