/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import icon from '../../images/search__icon.svg';

function SearchForm({ films,
  shortMovie,
  setShortMovie,
  onSearch, }) {

  const location = useLocation();
  const [value, setValue] = useState({});

  useEffect(() => {
    if (value.search) {
      onSearch(value.search, films);
    }
  }, [shortMovie]);

  useEffect(() => {
    if (location.pathname === '/movies') {
      setValue({ search: localStorage.getItem('textSearch') });
    }
  }, []);

  function handleInputValue(evt) {
    setValue({ search: evt.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (value.search) {
      onSearch(value.search, films);
    }
  }

  function toggleCheckbox(evt) {
    if (evt.target.checked) {
      setShortMovie(true);
    } else {
      setShortMovie(false);
    }
  }
 
  return (
    <section className="search">
      <form className="search__form" name="search" onSubmit={handleSubmit}>
        <label className="search__field">
          <img className="search__icon" src={icon} alt="Лупа." />
          <input
            className="search__input"
            id="search"
            name="search"
            type="search"
            placeholder="Фильм"
            value={value.search || ''}
            onChange={handleInputValue}
          />
          <button className="search__button">Найти</button>
        </label>
        <div className="search__field-checkbox" >
          <div className="search__checkbox">
            <input
              className="checkbox"
              id="checkbox"
              name="checkbox"
              type="checkbox"
              checked={!shortMovie ? false : true}
              onChange={toggleCheckbox}
            />
            <label className="label" htmlFor="checkbox"></label>
          </div>
          <label className="search__label-checkbox">Короткометражки</label>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;