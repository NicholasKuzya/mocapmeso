import { body } from "express-validator";

export const registerValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('name', 'Введи имя и фамилию').isLength({ min: 3 }),
	body('password', 'Пароль должен быть минимум из 6 символов').isLength({ min: 6 })
]