const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

	if(token) {
		try {
		const decoded = jwt.verify(token, 'mocapmeso 127');
		req.adminId = decoded._id;
		next();
	} catch (err) {
		console.error(err);
		return res.status(403).json({ message: 'Нет доступа' });
	}
	} else {
		return res.status(403).json({message: 'Нет доступа'});
	}
}