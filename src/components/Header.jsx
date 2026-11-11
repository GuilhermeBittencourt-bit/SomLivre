// Cabeçalho com saudação ao usuário e botão de logout (RF02).
function Header({ nome, onSair }) {
  return (
    <header className="header">
      <span>Olá, <strong>{nome}</strong></span>
      <button className="botao-sair" onClick={onSair}>Sair</button>
    </header>
  )
}

export default Header
