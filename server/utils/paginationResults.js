const Post = require("../models/Post.js");
function paginatedResults() {
	return async (req, res, next) => {

		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		const skipIndex = (page - 1) * limit;
		const results = {};

		try {
			results.results = await Post.find()
				.sort()
				.limit(limit)
				.skip(skipIndex)
				.exec();
			res.paginatedResults = results;
			next();
		} catch (e) {
			res.status(500).json({ message: "Error Occured" });
		}
	};
}
module.exports = paginatedResults;