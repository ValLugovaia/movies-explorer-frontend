import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ img, name, duration, save, trailerLink, onSave, movie }) {
  const { pathname } = useLocation();

  const isSaved = save ? "movies-card__button movies-card__button_saved" : "movies-card__button";

  function handleMovieSave() {
    onSave(movie);
  };

  return (
    <section className="movies-card">
      <div className="movies-card__description">
        <h3 className="movies-card__name">{name}</h3>
        <p className="movies-card__duration">{duration} минут</p>
      </div>
      <a href={trailerLink} className="movies-card__link-trailer" target="_blank" rel="noreferrer">
        <img className="movies-card__image" src={img} alt={`Афиша фильма ${name}.`} />
      </a>
      <button className={pathname === "/movies" ? isSaved : "movies-card__button movies-card__button_delete"} onClick={handleMovieSave} type="button"></button>
    </section>
  );
}

export default MoviesCard;