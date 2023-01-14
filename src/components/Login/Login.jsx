/* eslint-disable react-hooks/exhaustive-deps */
import './Login.css';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import useValidation from '../../hooks/useValidation';
import { validEmailText, validPasswordText, badRequestText, internalServerErrorText, EMAIL_REGEXP } from '../../utils/constants';

function Login({ onLogin, isLoading, resStatus, setResStatus }) {
    const {
        values,
        isValid,
        isValidForm,
        handleChange,
        resetForm,
    } = useValidation();

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin(values.email, values.password);
    }

    const isEnable = isLoading && isValidForm;

    useEffect(() => {
        return () => {
          resetForm();
        }
    }, []);

    useEffect(() => {
        setResStatus('');
      }, []);

    const authText = (resStatus === 'Ошибка: 400' ? badRequestText : (resStatus === 'Ошибка: 500' ? internalServerErrorText: false));

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
                        value={values.email || ""}
                        required
                        onChange={handleChange}
                        pattern={values.email ? EMAIL_REGEXP : null}
                    />
                    <span className="auth__error" id="email-error">{!isValid.email && validEmailText}</span>
                </label>
                <label className="auth__field">
                    <span className="auth__label">Пароль</span>
                    <input
                        className="auth__input auth__input_type_password"
                        id="password"
                        name="password"
                        type="password"
                        value={values.password || ""}
                        required
                        onChange={handleChange}
                        minLength="8"
                    />
                    <span className="auth__error" id="password-error">{!isValid.password && validPasswordText}</span>
                </label>
                <div className="auth__bottom auth__bottom_login">
                    <span className="auth__response" id="res-error">{authText}</span>
                    <button className="auth__submit-button" type="submit" disabled={!isEnable}>Войти</button>
                    <p className="auth__link-text">Ещё не зарегистрированы?&ensp;
                        <NavLink to="/signup" className="auth__link">Регистрация</NavLink>
                    </p>
                </div>
            </form>
        </section>
    )
}

export default Login;