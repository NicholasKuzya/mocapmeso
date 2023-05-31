const Router = require('express');
const controller = require('../controllers/AuthController.js');
const checkAuth = require("../utils/checkAuth.js");

const router = new Router();
router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/me', checkAuth, controller.getMe);

module.exports = router;