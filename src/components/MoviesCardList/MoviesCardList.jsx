import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    return (
        <section className="movies-card-list">
            <section className="movies-card-list__block">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </section> 
            <button className="movies-card-list__button" type="button">Ещё</button>
        </section>
    );
}

export default MoviesCardList;