const Admin = require("../models/Admin.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
class AuthController {
	
	async registration(req, res) {
		try {
			const { email, name, password, key } = req.body;
			if (key !== '$2a$10$1kIVZP.XtcqyXcyNY/AbauOzouojp5MBbHnlf03N.KcTDhi0dOx8C') {
				return res.status(404).json({message: 'Отказано в доступе'});
			}
			const candidate = await Admin.findOne({email: email});
			if(candidate) {
				return res.status(400).json({ message: 'Такая почта уже есть в системе' });
			}
			const salt = bcrypt.genSaltSync(10);
			const hashPassword = await bcrypt.hash(password, salt);

			const admin = new Admin({
				email,
				name,
				password: hashPassword,
				avatars: {
					url: '',
					alt: ''
				}
			});
			await admin.save();

			const token = jwt.sign({
				_id: admin._id
			}, 'mocapmeso 127', {
				expiresIn: '30d'
			});
			req.session.token = token;
			res.status(200).redirect('/admin');
	} catch (err) {
		console.error(err);
		res.status(500).json({message: 'Не удалось добавить админа'});
	}
	}
	async login(req, res) {
		try {
			const { email, password } = req.body
			console.log(req.body)
			const candidate = await Admin.findOne({ email: email })
			if (!candidate) {
				return res.status(400).json({ message: `Пользователь ${email} не найден` })
			}
			const validPassword = bcrypt.compareSync(password, candidate.password)
			if (!validPassword) {
				return res.status(400).json({ message: `Логин или пароль введены неверно` })
			}
			const token = jwt.sign({
				_id: candidate._id
			}, 'mocapmeso 127', {
				expiresIn: '30d'
			});
			req.session.token = token;
			console.log(req.session)
			return res.status(200).redirect('/admin');
		} catch (e) {
			console.log(e)
			res.status(400).json({ message: 'login error' })
		}
	}
	async getMe(req, res) {
		try {
			const candidate = await Admin.findById(req.adminId);
			if(!candidate) {
				return res.status(404).json({ message: `Пользователь не найден` });
			}
			res.status(200).json({ candidate });
		} catch (err) {
			console.error(err)
			res.status(404)
		}
	}
}

module.exports = new AuthController();