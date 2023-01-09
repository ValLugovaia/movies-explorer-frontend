import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  onSearch,
  savedMovies,
  onDelete,
  shortMovie,
  setShortMovie,
  isVisibleButton
}) {

  return (
    <main>
      <SearchForm films={savedMovies} shortMovie={shortMovie} setShortMovie={setShortMovie} onSearch={onSearch} />
      <MoviesCardList savedMovies={savedMovies} isVisibleButton={false} onSave={onDelete} films={savedMovies} />
    </main>  
  );
}

export default SavedMovies;