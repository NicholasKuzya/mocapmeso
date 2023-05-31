const Post = require("../models/Post.js");
const nodemailer = require('nodemailer')

class SiteController {
	async getAdmin(req, res) {
		const isSession = req.session.token;
		if(!isSession) {
			return res.status(400).redirect('/login')
		}
		res.status(200).sendFile('index.html', { root: './admin' })
	}
	async getReg(req, res) {
		res.status(200).sendFile('registration.html', { root: './admin' })
	}
	async getLog(req, res) {
		res.status(200).sendFile('login.html', { root: './admin' })
	}
	async adminBlogs(req, res) {
		const isSession = req.session.token;
		if (!isSession) {
			return res.status(400).redirect('/login')
		}
		res.status(200).sendFile('blogs.html', { root: './admin' })
	}
	async adminBlog(req, res) {
		const isSession = req.session.token;
		const title = req.params;
		const post = Post.findOne({slug: title});
		if (!isSession) {
			return res.status(400).redirect('/login')
		}
		if(!post) {
			return res.status(400).redirect('/admin/blogs')
		}
		res.status(200).sendFile('blog.html', { root: './admin' })
	}
	async adminUpdBlog(req, res) {
		const isSession = req.session.token;
		const title = req.params;
		const post = Post.findOne({ slug: title });
		if (!isSession) {
			return res.status(400).redirect('/login')
		}
		if (!post) {
			return res.status(400).redirect('/admin/blogs')
		}
		res.status(200).sendFile('updBlog.html', { root: './admin' })
	}
	async sendMail(req, res) {
		console.log(req.body)
		const { bodyPart, email, making, facePart, name, phone, retarget, totalHours } = req.body
		const from = ' business.moviestudio@gmail.com'
		const pass = 'xbqteerghdlfcilp'
		const to = 'mesomocap@gmail.com'
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: from,
				pass: pass
			}
		})
		const mailOptions = {
			from: from,
			to: to,
			subject: 'Заявка на запись',
			text: `Привет! Мне нужна ${making} запись, для ${bodyPart ? bodyPart : ''} ${facePart ? facePart : ''}, ${retarget ? "Также мне " + retarget : ''}, Часов записи: ${totalHours} Мое имя: ${name} Почта: ${email} Мой телефон: ${phone}`
		}
		transporter.sendMail(mailOptions, err => console.error(err))
		res.status(200)
	}
}
module.exports = new SiteController();