import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <Link to="/" aria-label="На главную">
        <img className="logotype" src="/assets/logotype.svg" alt="Логотип" />
      </Link>
      <Link className="btn secondary" to="/auth">
        Войти
      </Link>
    </header>
  )
}

export default Header

