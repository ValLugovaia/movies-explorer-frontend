/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  onSearch,
  movies,
  savedMovies,
  getSavedMovies,
  onDelete,
  isVisibleButton,
}) {
  const [textSearch, setTextSearch] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  function handleTextSearch(textSearch) {
    setTextSearch(textSearch);
  };

  function handleChecked(isChecked) {
    setIsChecked(isChecked);
  };

  useEffect(() => {
    getSavedMovies();
  }, []);

  return (
    <main>
      <SearchForm onSearch={onSearch} textSearch={textSearch} handleTextSearch={handleTextSearch} isChecked={isChecked} onChecked={handleChecked} />
      <MoviesCardList films={movies} savedMovies={savedMovies} onSave={onDelete} isVisibleButton={false} textSearch={textSearch} />
    </main>  
  );
}

export default SavedMovies;