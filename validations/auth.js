import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
  body("fullName", "Укажите имя, минимальное количество символов 3").isLength({
    min: 3,
  }),
  body("avatarUrl", "Неверная ссылка на автарку").optional().isURL(),
];
