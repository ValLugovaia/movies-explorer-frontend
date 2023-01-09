import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({
  onSearch,
  movies,
  showedMovies,
  savedMovies,
  onSave,
  onDelete,
  handleMoreButton,
  shortMovie,
  setShortMovie,
  isLoading,
  isVisibleButton
}) {

  return (
    <main>
      <SearchForm films={movies} shortMovie={shortMovie} setShortMovie={setShortMovie} onSearch={onSearch} />
      { isLoading ?
        <Preloader />
        :
        <MoviesCardList savedMovies={savedMovies} onMore={handleMoreButton} onSave={onSave} onDelete={onDelete} films={showedMovies} isVisibleButton={isVisibleButton} />
      }
    </main>  
  );
}

export default Movies;