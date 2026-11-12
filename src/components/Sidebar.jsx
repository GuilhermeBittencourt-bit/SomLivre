// Menu lateral. "Buscar" e "Sua Biblioteca" ficam desabilitados na v0.1
// (a busca já está no topo da Home; playlists são da Aula 04).
function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="logo">SomLivre</h1>
      <nav>
        <button className="item-menu ativo">Início</button>
        <button className="item-menu" disabled>Buscar</button>
        <button className="item-menu" disabled title="Disponível na Aula 04">Sua Biblioteca</button>
      </nav>
    </aside>
  )
}

export default Sidebar
