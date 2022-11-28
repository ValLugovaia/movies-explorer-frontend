import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import Navigation from '../Navigation/Navigation';

function Header() {
    return (
      <header className="header">
        <div className="header__block">
          <Link to="/">
            <img className="header__logo" src={logo} alt="Логотип учебного проекта." />
          </Link>
          <Navigation />
        </div>     
      </header>  
  );
}

export default Header;