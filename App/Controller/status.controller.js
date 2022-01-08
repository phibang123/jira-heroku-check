const categoryService = require("../Services/status.services");

const getStatus = async (req, res) => {
	try {
		const statusList = await categoryService.getAllStatus();
		if (statusList) {
			res.status(200).json({
				success: true,
				statusCode: 200,
				content: statusList,
			});
		} else {
			res
				.status(400)
				.json({ success: true, statusCode: 404, message: "Not Found" });
		}
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 404, message: "Not Found" });
	}
};

module.exports = {
	getStatus: getStatus,
};
