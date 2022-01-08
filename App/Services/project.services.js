const {
	Project,
	Status,
	Task,
	Priority,
	TaskType,
	Comment,
	UserAssignTask,
	UserAssignProject,
	Users,
	Category,
	CommentDetail,
} = require("../Model/root.modal");

//const { UserAssign } = require("../Model/root.modal");

const getTaskByStatus = async (req) => {
	let taskAllStatusProject = await Status.findAll({
		model: Status,
		include: [
			{
				model: Task,
				as: "task_tables",
				include: [
					{
						model: Priority,
					},
					{ model: TaskType },
					{
						model: Users,
						as: "UserAssignTask",
						attributes: ["userId", "name", "avatar"],
						through: {
							attributes: [],
						},
					},
					{
						model: CommentDetail,
						as: "TaskComment",
						include: [
							{ model: Comment, as: "CommentContent" },
							{ model: Users, as: "UserComment" },
						],
						// //attributes: ['commentId'],
					},
					{ model: Users },
				],

				required: true,
				where: {
					projectTableProjectId: req,
				},
				required: false,
			},
		],
		required: false,
	});

	return taskAllStatusProject;
};

const getProjectDetail = async (req) => {
	let projectDetail = await Project.findOne({
		include: [
			{ model: Category },
			{ model: Users },
			{ model: Users, as: "UserAssignProject" },
		],
		where: { projectId: req },
	});

	//console.log(projectDetail);
	// .then(function(accounts) {
	// 	return _.map(accounts, function(account) { return account.Name; })
	// })
	//console.log(JSON.stringify(projectDetail,null,2))
	return projectDetail;
};

const getAllProject = async (req) => {
	let projectAll = await Project.findAll({
		include: [
			{ model: Category },
			{ model: Users },

			{
				model: Users,
				as: "UserAssignProject",
				through: {
					attributes: [],
				},
			},
		],
	});

	return projectAll;
};

const createProject = async (req) => {
	let project = await Project.create(req);
	return project;
};

const checkCreatorProject = async (req) => {
	try {
		let checkproject = await Project.findOne({
			where: { projectId: req.projectId },
		});
		return checkproject;
	} catch (error) {
		throw new Error("Project not exist");
	}
};

const deleteProjectById = async (req) => {
	try {
		let deleteProject = await Project.destroy({
			where: { projectId: req.projectId },
			attributes: ["projectId"],
		});
		return deleteProject;
	} catch (error) {
		throw new Error(error);
	}
};

const updateProject = async (projected, req) => {
	try {
		let { categoryTableCategoryId, description, projectName, projectId } = req;

		//let projected = await Project.findOne({projectId: projectId})

		if (projected) {
			projected.categoryTableCategoryId = categoryTableCategoryId;
			projected.description = description;
			projected.projectName = projectName;
			projected.alias = projectName;

			const projectUpdate = await projected.save();
			return projectUpdate;
		} else {
			throw new Error(error);
		}
	} catch (error) {
		throw new Error(error);
	}
};

const assignUserProject = async (project) => {
	let { userId, projectId } = project;
	try {
		//console.log( userId, projectId )
		let userAss = await UserAssignProject.create({ userId, projectId });
		return userAss;
	} catch (error) {
		throw new Error();
	}
};

const checkUserAssignTask = async (req) => {
	let { userId, projectId } = req;
	let userAsignTask = await Task.findAll({
		include: [{ model: Users, as: "UserAssignTask", where: userId }],
		where: { projectTableProjectId: projectId },
	});

	return userAsignTask;
};

const removeUserProject = async (project) => {
	let { userId, projectId } = project;

	let userAss = await UserAssignProject.destroy({
		where: { userId, projectId },
	});
	return userAss;
};

const findUserAssgnTask = async ({ projectId, userId }) => {
	console.log(123);
	let taskFind = await Task.findAll({
		// include: [{
		// 	model: UserAssignTask,
		// 	where: {
		// 		userId
		// 	}
		// }],
		include: [
			{
				model: Users,
				as: "UserAssignTask",
				attributes: ["userId", "name", "avatar"],
				where: { userId },
			},
		],
		where: {
			projectTableProjectId: projectId,
		},
	});

	return taskFind;
};

module.exports = {
	getProjectDetail,
	getTaskByStatus,
	getAllProject,
	createProject,
	checkCreatorProject,
	deleteProjectById,
	updateProject,
	assignUserProject,
	checkUserAssignTask,
	removeUserProject,
	findUserAssgnTask,
};
