import './Login.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../images/header__logo.svg';

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSetEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleSetPassword(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin(email, password);
    }

    return (
        <section className="auth">
            <div className="auth__top">
                <NavLink to="/"><img className="auth__logo" src={logo} alt="Логотип учебного проекта." /></NavLink>
                <h1 className="auth__title">Рады видеть!</h1>
            </div>
            <form className="auth__form" onSubmit={handleSubmit}>
                <label className="auth__field">
                    <span className="auth__label">E-mail</span>
                    <input
                        className="auth__input auth__input_type_email"
                        id="email"
                        name="email"
                        type="email"
                        value={email || ""}
                        required
                        onChange={handleSetEmail}
                    />
                    <span className="auth__error" id="email-error"></span>
                </label>
                <label className="auth__field">
                    <span className="auth__label">Пароль</span>
                    <input
                        className="auth__input auth__input_type_password"
                        id="password"
                        name="password"
                        type="password"
                        value={password || ""}
                        required
                        onChange={handleSetPassword}
                    />
                    <span className="auth__error" id="password-error"></span>
                </label>
                <div className="auth__bottom auth__bottom_login">
                    <button className="auth__submit-button" type="submit">Войти</button>
                    <p className="auth__link-text">Ещё не зарегистрированы?&ensp;
                        <NavLink to="/signup" className="auth__link">Регистрация</NavLink>
                    </p>
                </div>
            </form>
        </section>
    )
}

export default Login;