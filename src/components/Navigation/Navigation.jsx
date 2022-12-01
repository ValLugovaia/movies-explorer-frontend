import './Navigation.css';
import { Route, NavLink } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import icon from '../../images/profile__icon.svg';

function Navigation() {
  return (
    <div className="navigation">
        <Route exact path="/">
            <div className="navigation__main-links">
                <NavLink className="navigation__main-link" to="signup">Регистрация</NavLink>
                <NavLink className="navigation__main-link navigation__main-link_black" to="signin">Войти</NavLink>
            </div>    
        </Route>
        <Route path="/movies">
            <div className="navigation__links">
                <NavLink to="/"><img className="header__logo" src={logo} alt="Логотип учебного проекта." /></NavLink>
                <div className="navigation__block-links">
                    <div className="navigation__movies-links">
                        <NavLink className="navigation__movies-link" to="movies">Фильмы</NavLink>
                        <NavLink className="navigation__movies-link" to="saved-movies">Сохранённые фильмы</NavLink>
                    </div>
                    <div className="navigation__profile-links">
                        <NavLink className="navigation__profile-link" to="profile">Аккаунт</NavLink>
                        <NavLink className="navigation__profile-link" to="profile"><img className="header__logo" src={icon} alt="Иконка профиля." /></NavLink>
                    </div>
                </div>
            </div>
        </Route>
        <Route path="/saved-movies">
            <div className="navigation__links">
                <div className="navigation__movies-links">
                    <NavLink className="navigation__movies-link" to="/"><img className="header__logo" src={logo} alt="Логотип учебного проекта." /></NavLink>
                    <NavLink className="navigation__movies-link" to="movies">Фильмы</NavLink>
                    <NavLink className="navigation__movies-link" to="saved-movies">Сохранённые фильмы</NavLink>
                </div>
                <div className="navigation__profile-links">
                    <NavLink className="navigation__link" to="profile">Аккаунт</NavLink>
                    <NavLink className="navigation__link" to="profile"><img className="header__logo" src={icon} alt="Иконка профиля." /></NavLink>
                </div>
            </div>
        </Route>
        <Route path="/profile">
            <div className="navigation__block-links">
                <div className="navigation__movies-links">
                    <NavLink className="navigation__movies-link" to="/"><img className="header__logo" src={logo} alt="Логотип учебного проекта." /></NavLink>
                    <NavLink className="navigation__movies-link" to="movies">Фильмы</NavLink>
                    <NavLink className="navigation__movies-link" to="saved-movies">Сохранённые фильмы</NavLink>
                </div>
                <div className="navigation__profile-links">
                    <NavLink className="navigation__link" to="profile">Аккаунт</NavLink>
                    <NavLink className="navigation__link" to="profile"><img className="header__logo" src={icon} alt="Иконка профиля." /></NavLink>
                </div>
            </div>
        </Route>
        <Route path="/signup"></Route>
        <Route path="/signin"></Route>
    </div>
  );
}

export default Navigation;