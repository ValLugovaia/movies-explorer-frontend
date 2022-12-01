import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';

function Register() {
    return (
        <section className="auth">
            <div className="auth__top">
                <img className="auth__logo" src={logo} alt="Логотип учебного проекта." />
                <h1 className="auth__title">Добро пожаловать!</h1>
            </div>
            <form className="auth__form">
                <label className="auth__field">
                    <span className="auth__label">Имя</span>
                    <input
                        className="auth__input auth__input_type_name"
                        id="name"
                        name="name"
                        type="text"
                        required
                    />
                    <span className="auth__error" id="name-error"></span>
                </label>
                <label className="auth__field">
                    <span className="auth__label">E-mail</span>
                    <input
                        className="auth__input auth__input_type_email"
                        id="email"
                        name="email"
                        type="email"
                        required
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
                        required
                    />
                    <span className="auth__error" id="password-error"></span>
                </label>
            </form>
            <div className="auth__bottom">
                <button className="auth__submit-button" type="submit">Зарегистрироваться</button>
                <p className="auth__link-text">Уже зарегистрированы?&ensp;
                    <Link to="/signin" className="auth__link">Войти</Link>
                </p>
            </div>   
        </section>
    )
}

export default Register;