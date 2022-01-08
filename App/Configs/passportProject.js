const jwt = require("jsonwebtoken");
const projectServices = require("../Services/project.services");
const taskServices = require("../Services/task.services");

const passportProject = async (req, res, next) => {
	try {
		const authorizationHeader = req.headers["accesstoken"];

		//"Bearer [token]"
		const token = authorizationHeader.split(" ")[1];
		if (!token) {
			res.status(401).json({ success: false, statusCode: 401 });
			//res.sendStatus(401);
		}

		jwt.verify(token, "secret", async (err, data) => {
		
			if (err) {
				res.status(401).json({
					success: false,
					statusCode: 401,
					message: "Please Sigin again",
				});
			} else if (data?.id === undefined) {
				res.status(401).json({
					success: false,
					statusCode: 401,
					message: "unAuThor",
				});
			} else if (data?.id)
			{
				let { id } = data
				req.id = id;
				let { projectId } = req.body;
        
				//await projectServices.checkCreatorProject({ projectId })
				let checkAutorProject = await taskServices.checkTaskAuthor({
					projectId,
					id,
				});
				if (checkAutorProject) {
					next();
				} else {
					res.status(401).json({
						success: false,
						statusCode: 401,
						message: "You dont't have Author project",
					});
				}
			}
		});
	} catch (error) {
		res
			.status(401)
			.json({ success: false, statusCode: 405, message: "Please Sigin again" });
	}
};

module.exports = {
	passportProject: passportProject,
};
