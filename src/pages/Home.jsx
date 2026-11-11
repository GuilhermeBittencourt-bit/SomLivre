// Tela principal: sidebar + header + busca + grade de músicas + barra do player.
import { useState } from 'react'
import { catalogo } from '../data/catalogo.js'
import { buscarMusicas } from '../logic/busca.js'
import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'
import CardMusica from '../components/CardMusica.jsx'
import PlayerBar from '../components/PlayerBar.jsx'

function Home({ usuario, onSair }) {
  const [termo, setTermo] = useState('')
  const [musicaAtual, setMusicaAtual] = useState(null)

  // RF03 – a lista exibida é sempre o resultado da busca (termo vazio = catálogo todo)
  const resultados = buscarMusicas(termo, catalogo)

  return (
    <div className="layout">
      <Sidebar />

      <main className="conteudo">
        <Header nome={usuario.nome} onSair={onSair} />

        <input
          className="campo-busca"
          type="search"
          placeholder="Buscar por música, artista ou álbum..."
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
        />

        <h2>{termo ? `Resultados para "${termo}"` : 'Catálogo'}</h2>

        {resultados.length === 0 ? (
          <p className="sem-resultados">Nenhuma música encontrada.</p>
        ) : (
          <div className="grade">
            {resultados.map((musica) => (
              <CardMusica key={musica.id} musica={musica} onClick={() => setMusicaAtual(musica)} />
            ))}
          </div>
        )}
      </main>

      <PlayerBar musica={musicaAtual} />
    </div>
  )
}

export default Home
