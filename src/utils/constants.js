const MOBILE_COUNT = 5;
const MOBILE_MORE_COUNT = 2;

const TABLET_WIDTH = 768;
const TABLET_COUNT = 8;
const TABLET_MORE_COUNT = 2;

const DESKTOP_WIDTH = 1280;
const DESKTOP_COUNT = 12;
const DESKTOP_MORE_COUNT = 3;

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
    MOBILE_COUNT,
    MOBILE_MORE_COUNT,
    TABLET_WIDTH,
    TABLET_COUNT,
    TABLET_MORE_COUNT,
    DESKTOP_WIDTH,
    DESKTOP_COUNT,
    DESKTOP_MORE_COUNT,
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