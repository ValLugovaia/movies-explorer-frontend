/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import './SearchForm.css';
import icon from '../../images/search__icon.svg';

function SearchForm({
  onSearch,
  textSearch,
  handleTextSearch,
  isChecked,
  onChecked,
}) {
  function handleChange(evt) {
    handleTextSearch(evt.target.value);
  };
  
  function handleChecked(evt) {
    onChecked(evt.target.checked);
  };
  
  function handleSubmit(evt) {
    evt.preventDefault();
    onSearch({ textSearch, isChecked });
  };
  
  useEffect(() => {
    onSearch({ textSearch, isChecked });
  }, [isChecked]);
 
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
            value={textSearch || ''}
            onChange={handleChange}
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
              checked={isChecked}
              onChange={handleChecked}
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