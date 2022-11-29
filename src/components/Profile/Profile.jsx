import { Link } from 'react-router-dom';

function Profile() {
    return (
        <section className="profile">
            <h1 className="profile__title">Привет, Валентина!</h1>
            <form className="profile__form">
                <label className="profile__field">
                    <input
                        className="profile__input profile__input_type_name"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Имя"
                        required
                    />
                </label>
                <label className="profile__field">
                    <input
                        className="profile__input profile__input_type_email"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        required
                    />
                </label>
                <button className="profile__submit-button" type="submit">Редактировать</button>
                <Link to="/" className="profile__link">Выйти из аккаунта</Link>
            </form>
        </section>
    )
}

export default Profile;