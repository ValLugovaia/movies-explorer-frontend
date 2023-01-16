import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { enterSearchText, notFoundSearchText, notSavedMoviesText } from '../../utils/constants';

function MoviesCardList({
  films,
  savedMovies,
  onSave,
  onMore,
  isVisibleButton,
  textSearch,
  isChecked
}) {
  const { pathname } = useLocation();

  const textLocalStorage = localStorage.getItem('textSearch');
  
  const textSearchMovies = pathname === "/movies" ? textLocalStorage : textSearch;
  const enterWordText = !textSearchMovies && (pathname === "/movies" ? enterSearchText : (isChecked ? notFoundSearchText : notSavedMoviesText));
  const notFoundText = films.length === 0 && notFoundSearchText;
  const text = enterWordText || notFoundText;
  const isSaved = (movie) => {
    return savedMovies.some((i) => i.movieId === movie.id);
  };

  return (
    <>
      {films.length !== 0 && (textLocalStorage || pathname === '/saved-movies') ?
        <section className="movies-card-list">
          <div className="movies-card-list__block">
            {films.map((movie, i) => (
              <MoviesCard
                key={i}
                img={pathname === "/movies" ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image}
                name={movie.nameRU}
                duration={movie.duration}
                onSave={onSave}
                movie={movie}
                save={isSaved(movie)}
                trailerLink={movie.trailerLink} />
              ))}
          </div>
          {isVisibleButton && <button className="movies-card-list__button" type="button" onClick={onMore}>Ещё</button>}
        </section>
      :
      <div className="movies-card-list__text">{text}</div>
      }
    </>
  );
}

export default MoviesCardList;