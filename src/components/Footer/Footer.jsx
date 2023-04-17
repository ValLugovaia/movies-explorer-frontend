import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
        <span className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</span>
        <div className="footer__block">
            <span className="footer__year">&#169; 2022</span>
            <div className="footer__links">
                <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                <a className="footer__link" href="https://github.com/" target="_blank" rel="noreferrer">Github</a>
            </div>
        </div>
    </footer>
  );
}

export default Footer;