const projectServices = require("../Services/project.services");

const getDetailProject = async (req, res) => {
	try {
		let projectId = req.params.id;

		if (!projectId) {
			res.status(404).json({
				success: true,
				statusCode: 404,
				message: "Project is not found",
				content: "Project is not found",
			});
		} else {
			const projectDetail = await projectServices.getProjectDetail(projectId);

			if (projectDetail) {
				let indexUser = projectDetail?.UserAssignProject?.findIndex(
					(index) => index.userId === req.id
				);
				if (projectDetail.user_table?.userId !== req.id && indexUser === -1) {
					return res
						.status(500)
						.json({ success: true, statusCode: 500, message: "Not Found" });
				}

				//console.log(JSON.stringify(projectDetail, null, 2));
				const taskByStatus = await projectServices.getTaskByStatus(projectId);
				//console.log(JSON.stringify(taskByStatus,null,2))
				let projectArr = [projectDetail];
				const [projectDetailMap] = projectArr.map((p) => ({
					alias: p.alias,

					description: p.description,
					creator: {
						id: p.user_table?.userId,
						name: p.user_table?.name,
					},
					id: p.projectId,
					members: p?.UserAssignProject?.map((users) => {
						return {
							userId: users?.userId,
							name: users?.name,
							email: users?.email,
							avatar: users?.avatar,
							phoneNumber: users?.phoneNumber,
						};
					}),
					//lstTask: taskByStatus,
					lstTask: taskByStatus?.map((status) => {
						return {
							alias: status?.alias,
							lstTaskDeTail: status?.task_tables.map((task) => {
								return {
									alias: task?.taskName,
									assigness: task?.UserAssignTask.map((assign) => {
										return {
											id: assign?.userId,
											name: assign?.name,
											avatar: assign?.avatar,
										};
									}),
									lstComment: task?.TaskComment.map((comment) => {
										return {
											avatar: comment?.UserComment?.avatar,
											commentContent: comment?.CommentContent?.content,
											id: comment?.id,
											idUser: comment?.UserComment?.userId,
											name: comment?.UserComment.name,
										};
									}),
									userReporter: {
										userId: task?.user_table?.userId,
										name: task?.user_table?.name,
										avatar: task?.user_table?.avatar,
										email: task?.user_table?.email,
									},
									description: task?.description,
									originalEstimate: task?.originalEstimate,

									priorityId: task?.priorityTablePriorityId,
									priorityTask: {
										priority: task?.priority_table?.priority,
										priorityId: task?.priority_table?.priorityId,
									},
									projectId: task?.projectTableProjectId,
									statusId: task?.statusTableStatusId,
									taskId: task?.taskId,
									taskName: task?.taskName,
									taskTypeDetail: {
										id: task?.tasktype_table?.typeId,
										taskType: task?.tasktype_table?.taskType,
									},
									timeTrackingRemaining: task?.timeTrackingRemaining,
									timeTrackingSpent: task?.timeTrackingSpent,
									createTaskDate: task?.createTaskDate,
									typeId: task?.tasktypeTableTypeId,
								};
							}),
							statusId: status?.statusId,
							statusName: status?.statusName,
						};
					}),
					projectCategory: {
						id: p?.category_table?.categoryId,
						name: p?.category_table?.categoryName,
					},

					projectName: p.projectName,
					createProjectDate: p.createProjectDate,
				}));

				res.status(200).json({
					success: true,
					statusCode: 200,
					content: projectDetailMap,
				});
			} else {
				res
					.status(400)
					.json({ success: true, statusCode: 404, message: "Not Found" });
			}
		}
	} catch (error) {
		res
			.status(500)
			.json({ success: true, statusCode: 500, message: "Not Found" });
	}
};

const getAllProject = async (req, res) => {
	try {
		let projectAll = await projectServices.getAllProject();

		if (projectAll) {
			let projectAllMap = projectAll?.map((project) => {
				return {
					alias: project?.alias,
					categoryId: project?.categoryTableCategoryId,
					projectName: project?.projectName,
					categoryName: project?.category_table?.categoryName,
					creator: {
						id: project?.user_table?.userId,
						name: project?.user_table?.name,
					},
					description: project?.description,
					id: project?.projectId,
					members: project?.UserAssignProject?.map((user) => {
						return {
							userId: user?.userId,
							name: user?.name,
							avatar: user?.avatar,
						};
					}),
				};
			});
			res.status(200).json({
				success: true,
				statusCode: 200,
				content: projectAllMap,
			});
		} else {
			res
				.status(400)
				.json({ success: true, statusCode: 404, message: "Not Found" });
		}
	} catch (error) {
		res
			.status(500)
			.json({ success: true, statusCode: 500, message: "Not Found" });
	}
};

const createProject = async (req, res) => {
	try {
		let { projectName, description, categoryId } = req.body;
		let categoryTableCategoryId = categoryId;
		let alias = projectName;
		let userTableUserId = req.id;

		let createdproject = await projectServices.createProject({
			projectName,
			description,
			categoryTableCategoryId,
			alias,
			userTableUserId,
		});
		if (createdproject) {
			let projectResult = [createdproject];
			let [projectMap] = projectResult?.map((project) => {
				return {
					alias: project?.alias,
					categoryId: project?.categoryTableCategoryId,
					creator: project?.userTableUserId,
					description: project?.description,
					id: project?.projectId,
					projectName: project?.projectName,
				};
			});
			res.status(200).json({
				success: true,
				statusCode: 200,
				content: projectMap,
			});
		} else {
			res.status(500).json({
				success: false,
				statusCode: 500,
				message: "Not Found",
				content: "Not Found",
			});
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			statusCode: 400,
			message: "Project name exist",
			content: "Project name already exists",
		});
	}
};

const deleteProject = async (req, res) => {
	try {
		let projectId = req.params.id;
		let project = await projectServices.checkCreatorProject({ projectId });
		if (project.userTableUserId == req.id) {
			let id = req.id;
			await projectServices.deleteProjectById({ projectId, id });
			res.status(200).json({
				success: true,
				statusCode: 200,
				content: "Ddelete project is successfully",
			});
		} else {
			res.status(400).json({
				success: true,
				statusCode: 400,
				message: "User not Authorized",
			});
		}
	} catch (error) {
		console.log(error);
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Project not found" });
	}
};

const updateProject = async (req, res) => {
	try {
		let projectId = req.params.id;
		let project = await projectServices.checkCreatorProject({ projectId });
		if (project.userTableUserId === req.id) {
			let { categoryId, description, id, projectName } = req.body;
			let projectUpdate = await projectServices.updateProject(project, {
				categoryTableCategoryId: categoryId,
				description,
				projectId: id,
				projectName,
			});
			let [projectMap] = [projectUpdate]?.map((project) => {
				return {
					alias: project?.alias,
					categoryId: project?.categoryTableCategoryId,
					creator: project?.userTableUserId,
					description: project?.description,
					id: project?.projectId,
					projectName: project?.projectName,
				};
			});
			res.status(200).json({
				success: true,
				statusCode: 200,
				content: projectMap,
			});
		} else if (project.userTableUserId !== req.id) {
			res.status(400).json({
				success: true,
				statusCode: 400,
				message: "User not Authorized",
			});
		}
	} catch (error) {
		console.log(error);
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Project not found" });
	}
};

const asssignUserProject = async (req, res) => {
	try {
		let { projectId, userId } = req.body;
		let project = await projectServices.checkCreatorProject({ projectId });
		if (project.userTableUserId === req.id) {
			await projectServices.assignUserProject({ userId, projectId });

			res.status(200).json({
				success: true,
				statusCode: 200,
				message: "Xử lý thành công!",
				content: "has added the user to the project !",
			});
		} else {
			res.status(400).json({
				success: true,
				statusCode: 400,
				message: "User not Authorized",
			});
		}
	} catch (error) {
		//console.log(error)
		res.status(400).json({
			success: true,
			statusCode: 400,
			message: "User exesit project",
			content: "User exesit project",
		});
	}
};

const removeUserProject = async (req, res) => {
	let { projectId, userId } = req.body;

	try {
		let project = await projectServices.checkCreatorProject({ projectId });

		if (project.userTableUserId === req.id) {
			let taskAllUserAssgn = await projectServices.findUserAssgnTask({
				projectId,
				userId,
			});
			if (taskAllUserAssgn?.length === 0) {
				projectServices
					.removeUserProject({ userId, projectId })
					.then(() => {
						res.status(200).json({
							success: true,
							statusCode: 200,
							message: "Xử lý thành công!",
							content: "has added the user to the project !",
						});
					})
					.catch(() => {
						res.status(400).json({
							success: true,
							statusCode: 400,
							message: "User not found",
						});
					});
			}
			else
			{
				res.status(400).json({
					success: true,
					statusCode: 400,
					message: `User assign ${taskAllUserAssgn?.length} task, please remove user from task`,
					content: `User assign ${taskAllUserAssgn?.length} task, please remove user from task`
				});
			}
		} else {
			res.status(400).json({
				success: true,
				statusCode: 400,
				message: "User not Authorized",
				content:"User not Authorized"
			});
		}
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Project not found",content: "Project not found" });
	}
};

const userLeaveProject = async (req, res) => {
	try {
		let userId = req.id;
		let { projectId } = req.body;

		let project = await projectServices.getProjectDetail(projectId);
		if (project.projectId) {
			let index = project?.UserAssignProject?.findIndex(
				(project) => project.userId === userId
			);
			if (index === -1) {
				res.status(400).json({
					success: true,
					statusCode: 400,
					message: "You not assign project",
				});
			} else {
				let projectId = project.projectId;

				let countTaskAssign = await projectServices.checkUserAssignTask({
					userId,
					projectId,
				});

				if (countTaskAssign?.length === 0) {
					await projectServices.removeUserProject({ userId, projectId });
					res.status(200).json({
						success: true,
						statusCode: 200,
						message: "Leave Project is success",
						content: "Leave Project is success",
					});
				} else {
					res.status(400).json({
						success: false,
						statusCode: 400,
						message: `You have ${countTaskAssign.length} task assign , plase don
							't leave project`,
						content: `You have  ${countTaskAssign.length} task assign, plase don't leave project`,
					});
				}
			}
		} else {
			res.status(400).json({
				success: false,
				statusCode: 400,
				message: "Project not found",
				content: "Project not found",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			statusCode: 400,
			message: "Project not found",
			content: "Project not found",
		});
	}
};
module.exports = {
	getDetailProject,
	getAllProject,
	createProject,
	deleteProject,
	updateProject,
	asssignUserProject,
	removeUserProject,
	userLeaveProject,
};
