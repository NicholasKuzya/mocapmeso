const Post = require("../models/Post.js");
const path = require("path");
const paginatedResults = require("../utils/paginationResults.js");
class ApiController {
	async addPost(req, res) {
		try {
			const { title, content, description, author } = req.body;
			const preview = req.files.preview;
			let dateObject = new Date();
			let fullYear = dateObject.getFullYear();
			let fullMounth = dateObject.getMonth();
			let fullDay = dateObject.getDate();
			let date = '';
			if (fullMounth == 0) {
				date = 'Jan' + fullDay + fullYear;
			}
			if (fullMounth == 1) {
				date = `Feb ${fullDay}, ${fullYear}`;
			}
			if (fullMounth == 2) {
				date = `Mar ${fullDay}, ${fullYear}`;
			}
			if (fullMounth == 3) {
				date = `Apr ${fullDay}, ${fullYear}`;
			}
			if (fullMounth == 4) {
				date = `May ${fullDay}, ${fullYear}`;
			}
			if (fullMounth == 5) {
				date = `Jun ${fullDay}, ${fullYear}`;
			}
			if (fullMounth == 6) {
				date = `Jul ${fullDay}, ${fullYear}`;
			}
			if (fullMounth == 7) {
				date = `Aug ${fullDay}, ${fullYear}`;
			}
			if (fullMounth == 8) {
				date = `Sept ${fullDay}, ${fullYear}`;
			}
			if (fullMounth == 9) {
				date = `Oct ${fullDay}, ${fullYear}`;
			}
			if (fullMounth == 10) {
				date = `Nov ${fullDay}, ${fullYear}`;
			}
			if (fullMounth == 11) {
				date = `Dec ${fullDay}, ${fullYear}`;
			}
			const post = new Post({
				title,
				content,
				author,
				preview: {
					url: preview.name,
					alt: description
				},
				views: 0,
				date: date
			});
			await preview.mv(path.join('./public') + `/uploads/posts/${preview.name}`);
			await post.save();
			res.status(201).redirect('/admin/blogs')
		} catch (error) {
			console.error(error);
			res.status(404)
		}
	}
	async getPosts(req, res) {
		try {
			res.status(200).json(res.paginatedResults);
		} catch (error) {
			console.error(error);
			res.status(406)
		}
	}
	async getPost(req, res) {
		try {
			const postTitle = req.params.title;
			Post.find({ slug: postTitle }).then(data => {
				res.json(data);
				res.status(200);
			}).catch(err => {
				console.error(err)
				res.status(500);
			});
		} catch (error) {
			console.error(error);
			res.status(500)
		}
	}
	async delPost(req, res) {
		try {
			const postTitle = req.params.title;
			await Post.deleteOne({ slug: postTitle });
			res.status(200).redirect('/admin/blogs');
		} catch (error) {
			console.error(error);
			res.status(400)
		}
	}
	async updPost(req, res) {
		try {
			const postTitle = req.params.title;
			const { title, content, description } = req.body;
			if (req.files) {
				const preview = req.files.preview;
				const update = {
					title,
					content,
					preview: {
						url: preview.name,
						alt: description
					}
				}
				const updPost = await Post.findOneAndUpdate({ slug: postTitle }, update);
				await preview.mv(path.join('./public') + `/uploads/posts/${preview.name}`);
				updPost.save();
				res.status(200).redirect('/admin')
			} else {
				const update = {
					title,
					content
				}
				const updPost = await Post.findOneAndUpdate({ slug: postTitle }, update);
				updPost.save();
				res.status(200).redirect('/admin')
			}
		} catch (error) {
			console.error(error);
			res.status(404).redirect('/admin')
		}
	}
}

module.exports = new ApiController();