import './MoviesCard.css';

function MoviesCard() {
    return (
        <section className="movies-card">
            <div className="movies-card__description">
                <h3 className="movies-card__name">В погоне за Бенкси</h3>
                <p className="movies-card__duration">27 минут</p>
            </div>
            <img className="movies-card__image" src="https://www.timeout.ru/wp-content/uploads/2020/10/seasons-greetings-and-its-buyer-port-talbot-750x485.jpg" alt="Афиша фильма." />
            <button className="movies-card__button" type="button">Сохранить</button>
        </section>
    );
}

export default MoviesCard;