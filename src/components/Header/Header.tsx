import './Header.scss'

export function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img 
            src="/pokeball.svg" 
            alt="Pokeball" 
            className="header__logo-icon"
          />
          <h1 className="header__title">
            Lumis<span className="header__title-accent">Dex</span>
          </h1>
        </div>
        <p className="header__tagline">
          Sua Pokédex interativa
        </p>
      </div>
    </header>
  )
}

