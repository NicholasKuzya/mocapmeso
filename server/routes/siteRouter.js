const Router = require('express');
const controller = require('../controllers/SiteController.js');
const Post = require('../models/Post.js')
//const SitemapGenerator = require('sitemap-generator');
const { SitemapStream, streamToPromise } = require('sitemap')
const zlib = require('zlib')
const router = new Router();
//router.get('/blogs', controller.getPosts);
router.get('/registration', controller.getReg);
router.get('/login', controller.getLog);
router.get('/admin', controller.getAdmin);
router.get('/admin/blogs', controller.adminBlogs);
router.get('/admin/blog/:title', controller.adminBlog);
router.get('/admin/blog/:title/edit', controller.adminUpdBlog);
router.get('/ui', (req, res) => {
	res.sendFile('ui-kit.html', { root: '../client' })
});
router.get('/', (req, res) => {
	res.sendFile('index.html', { root: '../client' })
});
router.get('/blogs', (req, res) => {
	res.sendFile('posts.html', { root: '../client' })
});
router.get('/blog/:title', async (req, res) => {
	const postTitle = req.params.title;
	const doc = await Post.findOne({ slug: postTitle })
	let views = doc.views
	views++
	await Post.updateOne({ slug: postTitle }, { views: views })
	await doc.save();
	res.sendFile('blog.html', { root: '../client' })
});
router.get('/retarget', (req, res) => {
	res.sendFile('retarget.html', { root: '../client' })
});
router.get('/face', (req, res) => {
	res.sendFile('face.html', { root: '../client' })
});
router.get('/body', (req, res) => {
	res.sendFile('body.html', { root: '../client' })
});
router.get('/robots.txt', (req, res) => {
	res.sendFile('robots.txt', { root: '../client' })
});

let sitemap;
router.get('/sitemap.xml', async (req, res) => {
	res.header('Content-Type', 'application/xml');
	res.header('Content-Encoding', 'gzip');
	if (sitemap) {
		res.send(sitemap)
		return
	}
	const url = 'https://mocapmeso.ru'
	try {
		const allPosts = await Post.find().select('slug')
		const posts = allPosts.map(({ slug }) => `/blog/${slug}`)
		const smStream = new SitemapStream({ hostname: url })
		let pipeline = smStream.pipe(zlib.createGzip())
		smStream.write({ url: '/', changefreq: 'monthly', priority: 1 })
		smStream.write({ url: '/blogs', changefreq: 'monthly', priority: 1 })
		smStream.write({ url: '/face', changefreq: 'monthly', priority: 1 })
		smStream.write({ url: '/body', changefreq: 'monthly', priority: 1 })
		smStream.write({ url: '/retarget', changefreq: 'monthly', priority: 1 })
		posts.forEach(post => {
			smStream.write({ url: post, changefreq: 'weekly', priority: 1 })
		})
		streamToPromise(pipeline).then(sm => sitemap = sm)
		smStream.end()
		pipeline.pipe(res)
		//res.json(posts)
	} catch (error) {
		console.error(error)
		res.status(500).end()
	}
});
router.post('/application', controller.sendMail);
module.exports = router;