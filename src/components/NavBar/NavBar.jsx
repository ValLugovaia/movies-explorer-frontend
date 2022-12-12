import './NavBar.css';
import { NavLink } from 'react-router-dom';
import icon from '../../images/profile__icon.svg';
import close from '../../images/nav-bar__close-button.svg';

function NavBar({ isOpen, onClose }) {
  return (
    <div className={`nav-bar ${isOpen && "nav-bar_opened"}`}>
      <div className="nav-bar__block">
        <button className="nav-bar__close-button" type="button" onClick={onClose}><img src={close} alt="Крестик." /></button>
        <div className="nav-bar__movies-links">
          <NavLink className="nav-bar__movies-link" to="/">Главная</NavLink>
          <NavLink className="nav-bar__movies-link" activeClassName="nav-bar__link_active" to="movies">Фильмы</NavLink>
          <NavLink className="nav-bar__movies-link" activeClassName="nav-bar__link_active" to="saved-movies">Сохранённые фильмы</NavLink>
        </div>
        <div className="nav-bar__profile-links">
          <NavLink className="nav-bar__profile-link" activeClassName="nav-bar__link_active" to="profile">Аккаунт</NavLink>
          <NavLink to="profile">
            <div className="nav-bar__profile-icon">
              <img src={icon} alt="Иконка профиля." />
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NavBar;