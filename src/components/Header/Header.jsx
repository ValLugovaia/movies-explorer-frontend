import './Header.css';
import logo from '../../images/header__logo.svg';
import Navigation from '../Navigation/Navigation';

function Header() {
    return (
      <header className="header">
          <img className="header__logo" src={logo} alt="Логотип учебного проекта." />
          <Navigation />    
      </header>  
  );
}

export default Header;