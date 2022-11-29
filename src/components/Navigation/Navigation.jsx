import { Route, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <div className="navigation">
        <Route exact path="/">
            <NavLink className="navigation__NavLink" to="signup">Регистрация</NavLink>
            <NavLink className="navigation__NavLink" to="signin">Войти</NavLink>
        </Route>
        <Route path="/movies">
            <NavLink className="navigation__NavLink" to="movies">Фильмы</NavLink>
            <NavLink className="navigation__NavLink" to="saved-movies">Сохранённые фильмы</NavLink>
            <NavLink className="navigation__NavLink" to="profile">Аккаунт</NavLink>
        </Route>
        <Route path="/saved-movies">
            <NavLink className="navigation__NavLink" to="movies">Фильмы</NavLink>
            <NavLink className="navigation__NavLink" to="saved-movies">Сохранённые фильмы</NavLink>
            <NavLink className="navigation__NavLink" to="profile">Аккаунт</NavLink>
        </Route>
        <Route path="/profile">
            <NavLink className="navigation__NavLink" to="movies">Фильмы</NavLink>
            <NavLink className="navigation__NavLink" to="saved-movies">Сохранённые фильмы</NavLink>
            <NavLink className="navigation__NavLink" to="profile">Аккаунт</NavLink>
        </Route>
        <Route path="/signup"></Route>
        <Route path="/signin"></Route>
    </div>
  );
}

export default Navigation;