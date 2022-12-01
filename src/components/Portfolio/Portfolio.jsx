import './Portfolio.css';
import image from '../../images/portfolio__button.svg';

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://github.com/VaalIT/how-to-learn">Статичный сайт</a>
                    <a className="portfolio__link" href="https://github.com/VaalIT/how-to-learn"><img className="portfolio__button" src={image} alt="Стрелка." /></a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://github.com/VaalIT/russian-travel">Адаптивный сайт</a>
                    <a className="portfolio__link" href="https://github.com/VaalIT/russian-travel"><img className="portfolio__button" src={image} alt="Стрелка." /></a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://github.com/VaalIT/react-mesto-api-full">Одностраничное приложение</a>
                    <a className="portfolio__link" href="https://github.com/VaalIT/react-mesto-api-full"><img className="portfolio__button" src={image} alt="Стрелка." /></a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;