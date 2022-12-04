import './Header.css';
import Navigation from '../Navigation/Navigation';
import { NavLink } from 'react-router-dom';
import logo from '../../images/header__logo.svg';

function Header({ openNavBar }) {
    return (
      <header className="header">
          <NavLink to="/"><img className="header__logo" src={logo} alt="Логотип учебного проекта." /></NavLink>
          <Navigation openNavBar={openNavBar} />
      </header>  
  );
}

export default Header;