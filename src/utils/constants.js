const DESKTOP_WIDTH = 1280;
const DESKTOP_COUNTS = 3;
const DESKTOP_ROWS = 4;

const TABLET_WIDTH = 768;
const TABLET_COUNTS = 2;
const TABLET_ROWS = 4;

const MOBILE_COUNTS = 1;
const MOBILE_ROWS = 5;

const SHORT_MOVIE_DURATION = 40;

const validNameText = 'Некорректный формат имени';
const validEmailText = 'Некорректный формат Email';
const validPasswordText = 'Пароль содержит менее 8 знаков';

const enterSearchText = 'Введите текст поиска';
const notFoundSearchText = 'Ничего не найдено';
const notSavedMoviesText = 'Сохраненных фильмов нет';

const okUpdateText = 'Данные пользователя успешно обновлены';
const badRequestText = 'Переданы некорректные данные пользователя';
const unauthorizedText = 'Введён неверный email пользователя или пароль';
const сonflictText =  'Пользователь с таким email уже существует';
const internalServerErrorText = 'На сервере произошла ошибка';

const NAME_REGEXP = '^[А-ЯЁа-яёA-Za-z\\-]{2,30}(\\s[А-ЯЁа-яёA-Za-z1-9\\-]+)?$';
const EMAIL_REGEXP = '^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$';

export {
    DESKTOP_WIDTH,
    DESKTOP_COUNTS,
    DESKTOP_ROWS,
    TABLET_WIDTH,
    TABLET_COUNTS,
    TABLET_ROWS,
    MOBILE_COUNTS,
    MOBILE_ROWS,
    SHORT_MOVIE_DURATION,
    validNameText,
    validEmailText,
    validPasswordText,
    enterSearchText,
    notFoundSearchText,
    notSavedMoviesText,
    okUpdateText,
    badRequestText,
    unauthorizedText,
    сonflictText,
    internalServerErrorText,
    NAME_REGEXP,
    EMAIL_REGEXP,
};