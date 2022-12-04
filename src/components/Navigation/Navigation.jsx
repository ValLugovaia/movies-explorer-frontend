import './Navigation.css';
import { Route, NavLink } from 'react-router-dom';
import icon from '../../images/profile__icon.svg';
import burger from '../../images/nav-tab__icon.svg';

function Navigation({ openNavBar }) {
  return (
    <div className="navigation">
        <Route exact path="/">
            <div className="navigation__main-links">
                <NavLink className="navigation__main-link" to="signup">Регистрация</NavLink>
                <NavLink className="navigation__main-link navigation__main-link_black" to="signin">Войти</NavLink>
            </div>    
        </Route>
        <Route path="/movies">
            <div className="navigation__movies-links">
                <NavLink className="navigation__movies-link" to="movies">Фильмы</NavLink>
                <NavLink className="navigation__movies-link" to="saved-movies">Сохранённые фильмы</NavLink>
            </div>
            <div className="navigation__profile-links">
                <NavLink className="navigation__profile-link" to="profile">Аккаунт</NavLink>
                <NavLink to="profile">
                    <div className="navigation__profile-icon">
                        <img src={icon} alt="Иконка профиля." />
                    </div>
                </NavLink>
            </div>
            <button className="navigation__burger-button" onClick={openNavBar}><img src={burger} alt="Кнопка бургер." /></button>
        </Route>
        <Route path="/saved-movies">
            <div className="navigation__movies-links">
                <NavLink className="navigation__movies-link" to="movies">Фильмы</NavLink>
                <NavLink className="navigation__movies-link" to="saved-movies">Сохранённые фильмы</NavLink>
            </div>
            <div className="navigation__profile-links">
                <NavLink className="navigation__profile-link" to="profile">Аккаунт</NavLink>
                <NavLink to="profile">
                    <div className="navigation__profile-icon">
                        <img src={icon} alt="Иконка профиля." />
                    </div>
                </NavLink>
            </div>
            <button className="navigation__burger-button" onClick={openNavBar}><img src={burger} alt="Кнопка бургер." /></button>
        </Route>
        <Route path="/profile">
            <div className="navigation__movies-links">
                <NavLink className="navigation__movies-link" to="movies">Фильмы</NavLink>
                <NavLink className="navigation__movies-link" to="saved-movies">Сохранённые фильмы</NavLink>
            </div>
            <div className="navigation__profile-links">
                <NavLink className="navigation__profile-link" to="profile">Аккаунт</NavLink>
                <NavLink to="profile">
                    <div className="navigation__profile-icon">
                        <img src={icon} alt="Иконка профиля." />
                    </div>
                </NavLink>
            </div>
            <button className="navigation__burger-button" onClick={openNavBar}><img src={burger} alt="Кнопка бургер." /></button>
        </Route>
        <Route path="/signup"></Route>
        <Route path="/signin"></Route>
    </div>
  );
}

export default Navigation;