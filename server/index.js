const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const session = require('express-session');
const apiRouter = require('./routes/apiRouter.js');
const siteRouter = require('./routes/siteRouter.js');
const authRouter = require('./routes/authRouter.js');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/static', express.static('public'));
app.use('/client', express.static('../client'));
app.use(fileUpload());
app.use(session({
	secret: 'mocapmeso',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}));

try {
	mongoose.set("strictQuery", false);
	mongoose.connect(process.env.DB_CONFIG, {
		dbName: 'mocapmeso',
		autoIndex: false,
	});
	console.log('mongoose connected')
} catch (error) {
	console.error(error);
}

app.use('/', siteRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.post('/upload/image', async (req, res, next) => {
	const uploadImage = req.files.file;
	await uploadImage.mv(path.join('./public') + `/uploads/posts/${uploadImage.name}`);
	res.send({ 'location': `/static/uploads/posts/${uploadImage.name}` });
});
const PORT = process.env.PORT || 8081
const HOST = '141.8.192.82'
app.listen(PORT)