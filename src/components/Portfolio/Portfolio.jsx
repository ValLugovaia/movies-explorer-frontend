import './Portfolio.css';
import image from '../../images/portfolio__button.svg';

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://github.com/VaalIT/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт</a>
                    <a className="portfolio__link" href="https://github.com/VaalIT/how-to-learn" target="_blank" rel="noreferrer"><img className="portfolio__button" src={image} alt="Стрелка." /></a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://github.com/VaalIT/russian-travel" target="_blank" rel="noreferrer">Адаптивный сайт</a>
                    <a className="portfolio__link" href="https://github.com/VaalIT/russian-travel" target="_blank" rel="noreferrer"><img className="portfolio__button" src={image} alt="Стрелка." /></a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://github.com/VaalIT/react-mesto-api-full" target="_blank" rel="noreferrer">Одностраничное приложение</a>
                    <a className="portfolio__link" href="https://github.com/VaalIT/react-mesto-api-full" target="_blank" rel="noreferrer"><img className="portfolio__button" src={image} alt="Стрелка." /></a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;