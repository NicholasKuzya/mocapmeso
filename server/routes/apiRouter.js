const Router = require('express');
const controller = require('../controllers/ApiController.js');
const paginatedResults = require('../utils/paginationResults.js');

const router = new Router();
router.post('/blog', controller.addPost);
router.get('/blog/:title', controller.getPost);
router.delete('/blog/:title', controller.delPost);
router.post('/blog/:title/edit', controller.updPost);
router.get('/blogs', paginatedResults(), controller.getPosts);

module.exports = router;