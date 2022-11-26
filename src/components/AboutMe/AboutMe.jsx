import photo from '../../images/about-me__photo.jpg';

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__block">
                <h3 className="about-me__block-title">Валентина</h3>
                <span className="about-me__block-subtitle">Фронтенд-разработчик, 30 лет</span>
                <p className="about-me__block-text">Я родилась в Ростове-на-Дону, училась в Самаре в СамГУ, сейчас живу в Санкт-Петербурге. Люблю музыку, кинематограф, посещать различные фестивали и выставки, играю в интеллектуальные игры. 8 лет работала в диджитале, занималась продвижением сайтов, выросла с помощника SEO-специалиста до тимлида, ведущего SEO-специалиста. Год назад начала изучать фронтенд, стала учиться в Яндекс Практикуме на веб-разработчика. Сейчас полностью сконцентрирована на разработке, нацелена перезапустить карьеру и добиться в ней успехов.</p>
                <a className="about-me__link" href="https://github.com/VaalIT">Github</a>
            </div>
            <img className="about-me__photo" src={photo} alt="Фотография Валентины." />
        </section>
    );
}

export default AboutMe;