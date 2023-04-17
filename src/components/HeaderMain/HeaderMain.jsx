import './HeaderMain.css';
import logo from '../../images/header__logo.svg';
import Navigation from '../Navigation/Navigation';
import { Route, NavLink } from 'react-router-dom';

function HeaderMain({ isLoggedIn, openNavBar }) {
  return (
    <header className="header-main">
      <Route exact path="/">
        <NavLink to="/"><img className="header-main__logo" src={logo} alt="Логотип учебного проекта." /></NavLink>
      </Route>
      <Navigation isLoggedIn={isLoggedIn} openNavBar={openNavBar} />    
    </header>  
  );
}

export default HeaderMain;