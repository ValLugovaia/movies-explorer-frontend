const validNameText = "Некорректный формат имени";
const validEmailText = "Некорректный формат Email";
const validPasswordText = "Некорректный формат пароля";

const okUpdateText = "Данные пользователя успешно обновлены";
const badRequestUpdateText = "Переданы некорректные данные пользователя";
const сonflictUpdateText =  "Пользователь с таким email уже существует";
const internalServerErrorText = "На сервере произошла ошибка";

const NAME_REGEXP =
  '^[А-ЯЁа-яёA-Za-z\\-]{2,30}(\\s[А-ЯЁа-яёA-Za-z1-9\\-]+)?$';

const EMAIL_REGEXP = '^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$';

export { validNameText, validEmailText, validPasswordText, okUpdateText, badRequestUpdateText, сonflictUpdateText, internalServerErrorText, NAME_REGEXP, EMAIL_REGEXP };