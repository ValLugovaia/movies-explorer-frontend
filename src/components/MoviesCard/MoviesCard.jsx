function MoviesCard() {
    return (
        <section className="movies-card">
            <h3 className="movies-card__name">В погоне за Бенкси</h3>
            <p className="movies-card__duration">27 минут</p>
            <img className="movies-card__image" src="https://www.timeout.ru/wp-content/uploads/2020/10/seasons-greetings-and-its-buyer-port-talbot-750x485.jpg" alt="Афиша фильма." />
            <button className="movies-card__button" type="button">Сохранить</button>
        </section>
    );
}

export default MoviesCard;