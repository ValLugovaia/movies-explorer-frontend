import { Link } from 'react-router-dom';

function Register() {
    return (
        <section className="auth">
            <h1 className="auth__title">Добро пожаловать!</h1>
            <form className="auth__form">
                <label className="auth__field">
                    <input
                        className="auth__input auth__input_type_name"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Имя"
                        required
                    />
                    <span className="auth__error" id="name-error"></span>
                </label>
                <label className="auth__field">
                    <input
                        className="auth__input auth__input_type_email"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        required
                    />
                    <span className="auth__error" id="email-error"></span>
                </label>
                <label className="auth__field">
                    <input
                        className="auth__input auth__input_type_password"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        required
                    />
                    <span className="auth__error" id="password-error"></span>
                </label>
                <button className="auth__submit-button" type="submit">Зарегистрироваться</button>
                <p>Уже зарегистрированы?
                    <Link to="/signin" className="auth__link">Войти</Link>
                </p>
            </form>
        </section>
    )
}

export default Register;