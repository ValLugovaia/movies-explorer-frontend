import image from '../../images/promo__image.svg';

function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <img className="promo__image" src={image} alt="Картинка на фоне баннера." />
        </section>
    );
}

export default Promo;