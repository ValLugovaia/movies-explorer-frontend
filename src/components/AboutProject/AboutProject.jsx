import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__text">
                <div className="about-project__block">
                    <h3 className="about-project__block-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__block-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__block">
                    <h3 className="about-project__block-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__block-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__graph">
                <div className="about-project__graph-week">1 неделя</div>
                <div className="about-project__graph-week about-project__graph-week_grey">4 недели</div>
                <span className="about-project__graph-tech">Back-end</span>
                <span className="about-project__graph-tech">Front-end</span>
            </div>
        </section>
    );
}

export default AboutProject;