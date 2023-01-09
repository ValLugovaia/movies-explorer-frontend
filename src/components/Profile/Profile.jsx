/* eslint-disable react-hooks/exhaustive-deps */
import './Profile.css';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useValidation from '../../hooks/useValidation';
import { validNameText, validEmailText, okUpdateText, badRequestUpdateText, сonflictUpdateText, internalServerErrorText, NAME_REGEXP } from '../../utils/constants';

function Profile({ onUpdate, onLogout, resStatus, setResStatus }) {
    const {
        values,
        setValues,
        isValid,
        isValidForm,
        handleChange,
    } = useValidation();

  const currentUser = useContext(CurrentUserContext);

  const [onEdit, setOnEdit] = useState(false);

  function handleEditProfile() {
    setOnEdit(!onEdit);
  }

  function handleSubmit() {
    setOnEdit(false);
    onUpdate(values.name, values.email);
  }

  const isEnable = (currentUser.name === values.name && currentUser.email === values.email) || !isValidForm;
  const updateText = (resStatus === 200 && okUpdateText) || (resStatus === 400 && badRequestUpdateText) || (resStatus === 409 && сonflictUpdateText) || (resStatus === 500 && internalServerErrorText);

  useEffect(() => {
    setValues(currentUser);
  }, [])

  useEffect(() => {
    setResStatus('');
  }, [onEdit])

    return (
        <main>
            <section className="profile">
                <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
                <form className="profile__form" autoComplete="off" onSubmit={handleSubmit}>
                    <label className="profile__field">
                        <div className="profile__inpit-field">
                            <span className="profile__label">Имя</span>
                            <input
                                className="profile__input profile__input_type_name"
                                id="name"
                                name="name"
                                type="text"
                                value={values.name || currentUser.name || ""}
                                required
                                onChange={handleChange}
                                pattern={values.name ? NAME_REGEXP : null}
                            />
                        </div>
                        <span className="profile__error" id="name-error">{!isValid.name && validNameText}</span>
                    </label>
                    <label className="profile__field">
                        <div className="profile__inpit-field">
                            <span className="profile__label">E-mail</span>
                            <input
                                className="profile__input profile__input_type_email"
                                id="email"
                                name="email"
                                type="email"
                                value={values.email || currentUser.email || ""}
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <span className="profile__error" id="email-error">{!isValid.email && validEmailText}</span>
                    </label>
                    <span className="profile__error" id="res-error">{updateText}</span>
                    <button className="profile__submit-button" type="submit" onClick={handleEditProfile} disabled={isEnable}>Редактировать</button>
                    <button className="profile__link" onClick={onLogout}>Выйти из аккаунта</button>
                </form>
            </section>
        </main>
    )
}

export default Profile;