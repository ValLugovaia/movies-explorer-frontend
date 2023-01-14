/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  onSearch,
  savedMovies,
  getSavedMovies,
  foundSavedMovies,
  onDelete,
  shortMovie,
  setShortMovie,
  isVisibleButton
}) {

  useEffect(() => {
    getSavedMovies();
  }, []);

  return (
    <main>
      <SearchForm films={savedMovies} shortMovie={shortMovie} setShortMovie={setShortMovie} onSearch={onSearch} />
      <MoviesCardList savedMovies={savedMovies} isVisibleButton={false} onSave={onDelete} films={savedMovies} />
    </main>  
  );
}

export default SavedMovies;