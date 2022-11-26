function AboutProject() {
    return (
        <section className="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__block">
                <h3 className="about-project__block-title">Дипломный проект включал 5 этапов</h3>
                <p className="about-project__block-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className="about-project__block">
                <h3 className="about-project__block-title">На выполнение диплома ушло 5 недель</h3>
                <p className="about-project__block-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="about-project__graph">
                <div className="about-project__graph-week">
                    <span className="about-project__graph-week-caption">1 неделя</span>
                </div>
                <div className="about-project__graph-week">
                    <span className="about-project__graph-week-caption">4 недели</span>
                </div>
                <span className="about-project__graph-tech-caption">Back-end</span>
                <span className="about-project__graph-tech-caption">Front-end</span>
            </div>
        </section>
    );
}

export default AboutProject;