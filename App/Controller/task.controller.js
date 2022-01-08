const { Users } = require("../Model/root.modal");
const taskServices = require("../Services/task.services");
const taskService = require("../Services/task.services");

const updateStatus = async (req, res) => {
	let { taskId, statusId } = req.body;

	try {
		await taskService.updateSatusTask({ taskId, statusId });
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: "Update task successfully!",
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};

const updatePriority = async (req, res) => {
	let { taskId, priorityId } = req.body;

	try {
		await taskService.updatePriorityTask({ taskId, priorityId });
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: "Update task successfully!",
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};

const updateDescription = async (req, res) => {
	let { taskId, description } = req.body;

	try {
		await taskService.updateDescriptionTask({ taskId, description });
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: "Update task successfully!",
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};
const updateTimeTracking = async (req, res) => {
	let { taskId, timeTrackingRemaining, timeTrackingSpent } = req.body;

	try {
		await taskService.updateTimeTracking({
			taskId,
			timeTrackingRemaining,
			timeTrackingSpent,
		});
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: "Update task successfully!",
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};

const updateEstimate = async (req, res) => {
	let { taskId, originalEstimate } = req.body;

	try {
		await taskService.updateEstimate({
			taskId,
			originalEstimate,
		});
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: "Update task successfully!",
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};

const addUserAssignTask = async (req, res) => {
	let { taskId, userId } = req.body;

	try {
		await taskService.addUserAssignTask({ taskId, userId });
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: "Add user task successfully!",
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};

const removeUserAssignTask = async (req, res) => {
	let { taskId, userId } = req.body;

	try {
		await taskService.removeUserAssignTask({ taskId, userId });
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: "Remove user task successfully!",
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};
const createTask = async (req, res) => {
	try {
		let {
			listUserAsign,
			taskName,
			description,
			statusId,
			originalEstimate,
			timeTrackingSpent,
			timeTrackingRemaining,
			projectId,
			typeId,
			priorityId,
		} = req.body;
		reporter = req.id;
		let newTask = await taskService.createTask({
			taskName,
			description,
			statusTableStatusId: statusId,
			originalEstimate,
			reporter,
			timeTrackingSpent,
			timeTrackingRemaining,
			projectTableProjectId: projectId,
			tasktypeTableTypeId: typeId,
			priorityTablePriorityId: priorityId,
		});

		let listuserMap = listUserAsign?.map((user) => {
			return {
				userId: user,
				taskId: newTask?.taskId,
			};
		});
		await taskService.addUserAssignTaskList(listuserMap, newTask?.taskId);
		let [userMap] = [newTask]?.map((e) => {
			return {
				taskId: e.taskId,
				taskName: e.taskName,
				alias: e.taskName,
				description: e.description,
				statusId: e.statusTableStatusId,
				originalEstimate: e.originalEstimate,
				timeTrackingSpent: e.timeTrackingSpent,
				timeTrackingRemaining: e.timeTrackingRemaining,
				projectId: e.projectTableProjectId,
				typeId: e.tasktypeTableTypeId,
				priorityId: e.priorityTablePriorityId,
			};
		});
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: userMap,
		});
	} catch (error) {
		res.status(400).json({
			success: true,
			statusCode: 400,
			message: "Task not found",
			content: "task already exists!",
		});
	}
};

const updateTask = async (req, res) => {
	try {
		let {
			listUserAsign,
			taskName,
			description,
			statusId,
			originalEstimate,
			timeTrackingSpent,
			timeTrackingRemaining,
			projectId,
			typeId,
			priorityId,
			taskId,
		} = req.body;

		let newTask = await taskService.updateTask({
			taskName,
			description,
			taskId,
			statusTableStatusId: statusId,
			originalEstimate,
			timeTrackingSpent,
			timeTrackingRemaining,
			projectTableProjectId: projectId,
			tasktypeTableTypeId: typeId,
			priorityTablePriorityId: priorityId,
			taskId,
		});

		let listuserMap = listUserAsign?.map((user) => {
			return {
				userId: user,
				taskId: newTask?.taskId,
			};
		});
		await taskService.addUserAssignTaskList(listuserMap, newTask?.taskId);
		let [userMap] = [newTask]?.map((e) => {
			return {
				taskId: e.taskId,
				taskName: e.taskName,
				alias: e.taskName,
				description: e.description,
				statusId: e.statusTableStatusId,
				originalEstimate: e.originalEstimate,
				timeTrackingSpent: e.timeTrackingSpent,
				timeTrackingRemaining: e.timeTrackingRemaining,
				projectId: e.projectTableProjectId,
				typeId: e.tasktypeTableTypeId,
				priorityId: e.priorityTablePriorityId,
			};
		});
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: userMap,
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};

const getTaskDetail = async (req, res) => {
	try {
		let taskId = req.params.id;
		let task = await taskService.getTaskDetail(taskId);
		if (task[0]?.taskId) {
			let [taskMap] = task.map((task) => {
				return {
					alias: task.taskName,
					assigness: task?.UserAssignTask?.map((user) => {
						return {
							id: user?.userId,
							name: user?.name,
							avatar: user?.avatar,
						};
					}),
					description: task?.description,
					lstComment: task?.TaskComment?.map((comment) => {
						return {
							avatar: comment?.UserComment?.avatar,
							commentContent: comment?.CommentContent?.content,
							id: comment?.id,
							idUser: comment?.userId,
							name: comment?.UserComment?.name,
							taskId: task?.taskId,
							createdAt: comment?.CommentContent?.createdAt,
						};
					}),
					userReporter: {
						userId: task?.user_table?.userId,
						email: task?.user_table?.email,
						name: task?.user_table?.name,
						avatar: task?.user_table?.avatar,
					},
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
						taskType: task?.taskType_table?.taskType,
					},
					timeTrackingRemaining: task?.timeTrackingRemaining,
					timeTrackingSpent: task?.timeTrackingSpent,
					typeId: task?.tasktypeTableTypeId,
					createdAt: task?.createdAt,
					updatedAt: task?.updatedAt,
				};
			});
			res.status(200).json({
				success: true,
				statusCode: 200,
				message: "Xử lý thành công!",
				content: taskMap,
			});
		} else {
			res
				.status(400)
				.json({ success: true, statusCode: 400, message: "Task not found" });
		}
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};
const deleteTask = async (req, res) => {
	try {
		let userId = req.id;
		let taskId = req.params.id;
		let project = await taskService.checkAuthorTaskNotProject(taskId);

		if (project?.userTableUserId === userId) {
			await taskService.deleteTaskById(taskId);
			res.status(200).json({
				success: true,
				statusCode: 200,
				content: "Ddelete task is successfully",
				message: "Ddelete task is successfully",
			});
		} else {
			let task = await taskService.findTaskById(taskId);
	
			if (task.reporter === Number(req.id)) {
				await taskService.deleteTaskById(taskId);
				res.status(200).json({
					success: true,
					statusCode: 200,
					content: "Ddelete task is successfully",
					message: "Ddelete task is successfully",
				});
			} else {
				res
					.status(401)
					.json({ success: true, statusCode: 401, message: "You not Author" });
			}
		}
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};


const getAllTaskByProjectId = async (req, res) =>
{
	try {
		let id = req.params.id;
		let allTask = await taskServices.getAllTaskByIdPRoject(id)
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: allTask,
		});

		console.log(JSON.stringify(allTask,null,2))
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
}

module.exports = {
	updateStatus,
	updatePriority,
	updateDescription,
	updateTimeTracking,
	updateEstimate,
	addUserAssignTask,
	removeUserAssignTask,
	createTask,
	updateTask,
	getTaskDetail,
	deleteTask,
	getAllTaskByProjectId
};
