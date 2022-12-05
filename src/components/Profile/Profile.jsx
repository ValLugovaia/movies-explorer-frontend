import './Profile.css';
import { NavLink } from 'react-router-dom';

function Profile() {
    return (
        <main>
            <section className="profile">
                <h1 className="profile__title">Привет, Валентина!</h1>
                <form className="profile__form">
                    <label className="profile__field">
                        <span className="profile__label">Имя</span>
                        <input
                            className="profile__input profile__input_type_name"
                            id="name"
                            name="name"
                            type="text"
                            value="Валентина"
                            required
                        />
                    </label>
                    <label className="profile__field">
                        <span className="profile__label">E-mail</span>
                        <input
                            className="profile__input profile__input_type_email"
                            id="email"
                            name="email"
                            type="email"
                            value="vaal.it@yandex.ru"
                            required
                        />
                    </label>
                </form>
                <button className="profile__submit-button" type="submit">Редактировать</button>
                <NavLink to="/" className="profile__link">Выйти из аккаунта</NavLink>
            </section>
        </main>
    )
}

export default Profile;