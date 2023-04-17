/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({
  onSearch,
  movies,
  countShowedMovies,
  handleShowedMovies,
  savedMovies,
  getSavedMovies,
  onSave,
  onDelete,
  onMore,
  isVisibleButton,
  isLoading,  
  setIsLoading,
}) {
  const foundMoviesLocalStorage = JSON.parse(localStorage.getItem('foundMovies'));
  const textSearchLocalStorage = localStorage.getItem('textSearch');

  const [textSearch, setTextSearch] = useState(textSearchLocalStorage || '');
  const [isChecked, setIsChecked] = useState(isCheckedLocalStorage());

  function isCheckedLocalStorage() {
    if (localStorage.getItem('isChecked')) {
      return JSON.parse(localStorage.getItem('isChecked'));
    } return false;
  };

  function handleTextSearch(textSearch) {
    setTextSearch(textSearch);
  };

  function handleChecked(isChecked) {
    setIsChecked(isChecked);
  };

  useEffect(() => {
    if (foundMoviesLocalStorage) {
      handleShowedMovies(foundMoviesLocalStorage);
      getSavedMovies();
    } setIsLoading();
  }, [countShowedMovies]);

  return (
    <main>
      <SearchForm onSearch={onSearch} textSearch={textSearch} handleTextSearch={handleTextSearch} isChecked={isChecked} onChecked={handleChecked} />
      { isLoading ?
        <Preloader />
        :
        <MoviesCardList films={movies} savedMovies={savedMovies} onSave={onSave} onDelete={onDelete} onMore={onMore} isVisibleButton={isVisibleButton} textSearch={textSearch} isChecked={isChecked} />
      }
    </main>  
  );
}

export default Movies;