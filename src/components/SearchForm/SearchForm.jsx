import './SearchForm.css';
import icon from '../../images/search__icon.svg';

function SearchForm() {
  return (
    <section className="search">
        <form className="search__form">
            <label className="search__field">
                <img className="search__icon" src={icon} alt="Лупа." />
                <input
                    className="search__input"
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Фильм"
                    required
                />
                <button className="search__button">Найти</button>
            </label>
            <div className="search__field-checkbox">
                <div className="search__checkbox">
                    <input
                        className="checkbox"
                        id="checkbox"
                        name="checkbox"
                        type="checkbox"
                    />
                    <label className="label" for="checkbox"></label>
                </div>
                <label className="search__label-checkbox">Короткометражки</label>
            </div>
        </form>
    </section>
  );
}

export default SearchForm;