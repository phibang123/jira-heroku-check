//const { DB, HOST, PASSWORD, USER, dialect } = require("../Configs/db.config");
const { DB, HOST, PASSWORD, USER, dialect } = require("../Configs/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const { createUsersModel } = require("./users.modal");
const { createCategoryModel } = require("./category.modal");
const { createPriorityModel } = require("./priority.modal");
const { createStatusModel } = require("./status.modal");
const { createTaskTypeModel } = require("./taskType.modal");
const { createProjectModel } = require("./project.modal");
const { createUsersAssignProjectModel } = require("./uerAssignProject.modal");
const { createTaskModel } = require("./task.modal");
const { createUsersAssignTaskModel } = require("./userAssignTask.modal");
const { createCommentModel } = require("./commentt.modal");
const { createCommentDetailModel }  = require('./commentDetail.modal')
const yargs = require("yargs");

const sequelize = new Sequelize(DB, USER, PASSWORD,{
	host: HOST,
	dialect,
	// connectionString: process.env.DATABASE_URL,

	protocol: 'postgres',
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	}
});

const connected = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};
connected();

const Users = createUsersModel(sequelize);
const Category = createCategoryModel(sequelize);
const Priority = createPriorityModel(sequelize);
const Status = createStatusModel(sequelize);
const TaskType = createTaskTypeModel(sequelize);
const Project = createProjectModel(sequelize);
const UserAssignProject = createUsersAssignProjectModel(sequelize);
const UserAssignTask = createUsersAssignTaskModel(sequelize);
const Comment = createCommentModel(sequelize);
const CommentDetail = createCommentDetailModel(sequelize);
const Task = createTaskModel(sequelize);
//relationship

//Category - Project(1:N)
Category.hasMany(Project);
Project.belongsTo(Category, { allowNull: false });
//Users - Project(1:N) (creator)
Users.hasMany(Project,{onDelete: 'cascade' });
Project.belongsTo(Users,{onDelete: 'cascade' });
//Project - User(N:N) (Assign)
Users.belongsToMany(Project, {
	through: UserAssignProject,
	foreignKey: "userId",
	as: "ProjectAssignUser",
	onDelete: 'cascade' 
});
Project.belongsToMany(Users, {
	through: UserAssignProject,
	onDelete: 'cascade',
	foreignKey: "projectId",
	as: "UserAssignProject",
});
//Project - Task (1:N) (Task)
Project.hasMany(Task);
Task.belongsTo(Project);

//Priority
//Priority - Task (1:N)
Priority.hasMany(Task);
Task.belongsTo(Priority);

//TaskType
//TaskType - Task (1:N)
TaskType.hasMany(Task);
Task.belongsTo(TaskType);

//Status
//Status - Task (1:N)
Status.hasMany(Task ,{foreignKey: {
	defaultValue: "1"
}});
Task.belongsTo(Status);

//REPORTER
//REPORTER - Task (1:N)
Users.hasMany(Task ,{
	foreignKey: 'reporter',
	onDelete: 'cascade' 
});
Task.belongsTo(Users,{
	foreignKey: 'reporter',
	onDelete: 'cascade' 
});

//Project
//Project - Task (1:N)
Project.hasMany(Task,{onDelete: 'cascade' });
Task.belongsTo(Project,{onDelete: 'cascade' });

//Task - User(N:N) (Assign)
Users.belongsToMany(Task, {
	through: UserAssignTask,
	onDelete: 'cascade' ,
	foreignKey: "userId",
	as: "TaskAssignUser",
});
Task.belongsToMany(Users, {
	through: UserAssignTask,
	onDelete: 'cascade',
	foreignKey: "taskId",
	as: "UserAssignTask",
});

// //Comment
// //Task - Comment(1:N)
// Task.hasMany(Comment, {foreignKey: "taskId"});
// Comment.belongsTo(Task, {foreignKey: "taskId"})
// // //Users - Comment(1:N)
//  Users.hasMany(Comment, {foreignKey: "userId"});
//  Comment.belongsTo(Users, {foreignKey: "userId"})

// Users.belongsToMany(Task, {
// 	through: CommentDetail,
// 	foreignKey: "userId",
// 	as: "UserComment",
// });
// Task.belongsToMany(Users, {
// 	through: CommentDetail,
// 	foreignKey: "taskId",
// 	as: "TaskComment",
// });


//TaskComment
Task.hasMany(CommentDetail, {
	foreignKey: "taskId",
	as: "TaskComment",
});
CommentDetail.belongsTo(Task, {
	foreignKey: "taskId",
	as: "TaskComment",
});
//userComment
Users.hasMany(CommentDetail, {
	foreignKey: "userId",
	as: "UserComment",
});
CommentDetail.belongsTo(Users, {
	foreignKey: "userId",
	as: "UserComment",
});

//comment
Comment.hasMany(CommentDetail, {
	foreignKey: "commentContentId",
	onDelete: 'cascade',
	as: "CommentContent",
});
CommentDetail.belongsTo(Comment, {
	foreignKey: "commentContentId",
	as: "CommentContent",
});

const fistData = () => {
	sequelize
		.sync({ force: true })
		.then((result) =>
		{
			return Category.create({ categoryName: "Dự án web" });
		})
		.then((result) =>
		{
			return Category.create({ categoryName: "Dự án phần mềm" });
		})
		.then((result) =>
		{
			return Category.create({ categoryName: "Dự án di động" });
		})

		//Status
		.then((result) =>
		{
			return Status.create({
				statusId: "1",
				statusName: "BACKLOG",
				alias: "tồn động",
			});
		})
		.then((result) =>
		{
			return Status.create({
				statusId: "2",
				statusName: "SELECTED FOR DEVELOPMENT",
				alias: "được chọn để phát triển",
			});
		})
		.then((result) =>
		{
			return Status.create({
				statusId: "3",
				statusName: "IN PROGRESS",
				alias: "trong tiến trình",
			});
		})
		.then((result) =>
		{
			return Status.create({
				statusId: "4",
				statusName: "DONE",
				alias: "hoàn thành",
			});
		})

		// //Priority
		.then((result) =>
		{
			return Priority.create({
				priority: "High",
				description: "High",
				alias: "high",
			});
		})
		.then((result) =>
		{
			return Priority.create({
				priority: "Medium",
				description: "Medium",
				alias: "medium",
			});
		})
		.then((result) =>
		{
			return Priority.create({
				priority: "Low",
				description: "Low",
				alias: "low",
			});
		})
		.then((result) =>
		{
			return Priority.create({
				priority: "Lowest",
				description: "Lowest",
				alias: "lowest",
			});
		})

		//TaskType
		.then((result) =>
		{
			return TaskType.create({ taskType: "BUG" });
		})
		.then((result) =>
		{
			return TaskType.create({ taskType: "STORY" });
		})
		.then((result) =>
		{
			return TaskType.create({ taskType: "TASK" });
		})

		//Users
		.then(() =>
		{
			return Users.create({
				email: "phibang@gmail.com",
				password:
					"$2a$10$2uzRqhRWKNPPLrinAYONbegGrOcLKMaaXmEGXIMgUzVTw/4.W2BN6",
				name: "Bằng Đẹp trai",
				avatar: "https://bang0512.atlassian.net/secure/projectavatar?pid=10000&avatarId=10403&size=xxlarge",
				phoneNumber: "12456789",
			});
		})
		.then(() =>
		{
			return Users.create({
				email: "tanloi@gmail.com",
				password:
					"$2a$10$2uzRqhRWKNPPLrinAYONbegGrOcLKMaaXmEGXIMgUzVTw/4.W2BN6",
				name: "Lợi Kích Dục",
				avatar: "https://bang0512.atlassian.net/secure/projectavatar?pid=10000&avatarId=10402&size=xxlarge",
				phoneNumber: "987654",
			});
		})
		.then(() =>
		{
			return Users.create({
				email: "DucBui@gmail.com",
				password:
					"$2a$10$2uzRqhRWKNPPLrinAYONbegGrOcLKMaaXmEGXIMgUzVTw/4.W2BN6",
				name: "Đức Phắc Boi",
				avatar: "https://bang0512.atlassian.net/secure/projectavatar?pid=10000&avatarId=10401&size=xxlarge",
				phoneNumber: "987654",
			});
		})
		.then(() =>
		{
			return Users.create({
				email: "DucGia@gmail.com",
				password:
					"$2a$10$2uzRqhRWKNPPLrinAYONbegGrOcLKMaaXmEGXIMgUzVTw/4.W2BN6",
				name: "Đức San San",
				avatar: "https://bang0512.atlassian.net/secure/projectavatar?pid=10000&avatarId=10400&size=xxlarge",
				phoneNumber: "987654",
			});
		})
		//Project
		.then(() =>
		{
			return Project.create({
				projectName: "Shop bán hoa",
				description: "Hôm nay tui test sql",
				alias: "Shop bán hoa",
				categoryTableCategoryId: 1,
				userTableUserId: 1,
			});
		})
		.then(() =>
		{
			return Project.create({
				projectName: "Shop bán Lu",
				description: "Hom6 kia tui fix sql",
				alias: "Shop bán Lu",
				categoryTableCategoryId: 3,
				userTableUserId: 2,
			});
		})
		.then(() =>
		{
			return Project.create({
				projectName: "web covid",
				description: "Hom6 kia tui fix sql",
				alias: "web covid",
				categoryTableCategoryId: 1,
				userTableUserId: 3,
			});
		})
		//userAssignProject
		.then(() =>
		{
			return UserAssignProject.create({
				userId: 2,
				projectId: 1,
			});
		})
		.then(() =>
		{
			return UserAssignProject.create({
				userId: 3,
				projectId: 1,
			});
		})

		.then(() =>
		{
			return UserAssignProject.create({
				userId: 1,
				projectId: 2,
			});
		})
		// //Task
		.then(() =>
		{
			return Task.create({
				taskName: "font end",
				originalEstimate: 1000,
				description: "<p>abc</p>",
				timeTrackingSpent: 25,
				timeTrackingRemaining: 30,
				projectTableProjectId: 1,
				priorityTablePriorityId: 2,
				tasktypeTableTypeId: 1,
				reporter: 2
			});
		})
		.then(() =>
		{
			return Task.create({
				taskName: "back end",
				originalEstimate: 25000,
				timeTrackingSpent: 10,
				description: "<p>abc</p>",
				timeTrackingRemaining: 30,
				projectTableProjectId: 1,
				priorityTablePriorityId: 2,
				tasktypeTableTypeId: 1,
				statusTableStatusId: 1,
				reporter: 1
			});
		})
		.then(() =>
		{
			return Task.create({
				taskName: "redux thunk",
				originalEstimate: 25000,
				timeTrackingSpent: 10,
				description: "<p>abc</p>",
				timeTrackingRemaining: 30,
				projectTableProjectId: 2,
				priorityTablePriorityId: 2,
				tasktypeTableTypeId: 1,
				statusTableStatusId: 4,
				reporter: 2
			});
		})
		.then(() =>
		{
			return Task.create({
				taskName: "redux saga",
				originalEstimate: 25000,
				timeTrackingSpent: 10,
				description: "<p>abc</p>",
				timeTrackingRemaining: 30,
				projectTableProjectId: 2,
				priorityTablePriorityId: 2,
				tasktypeTableTypeId: 1,
				statusTableStatusId: 2,
				reporter: 1
			});
		})
		.then(() =>
		{
			return Task.create({
				taskName: "react Server",
				originalEstimate: 25000,
				timeTrackingSpent: 10,
				description: "<p>abc</p>",
				timeTrackingRemaining: 30,
				projectTableProjectId: 2,
				priorityTablePriorityId: 2,
				tasktypeTableTypeId: 1,
				statusTableStatusId: 1,
				reporter: 1
			});
		})

		//  //user Assign Task
		.then(() =>
		{
			return UserAssignTask.create({
				userId: 2,
				taskId: 1,
			});
		})
		.then(() =>
		{
			return UserAssignTask.create({
				userId: 2,
				taskId: 2,
			});
		})
		.then(() =>
		{
			return UserAssignTask.create({
				userId: 3,
				taskId: 2,
			});
		})
		.then(() =>
		{
			return Comment.create({
				content: "Alo alo 1234 1234",
				userId: 3,
				taskId: 1,
			});
		})
		.then(() =>
		{
			return Comment.create({
				content: "Dung co nhon",
				userId: 4,
				taskId: 1,
			});
		}).then(() =>
		{
			return CommentDetail.create({
			
				userId: 4,
				taskId: 1,
				commentContentId: 2
			});
		}).then(() =>
		{
			return CommentDetail.create({
			
				userId: 3,
				taskId: 1,
				commentContentId: 1
			});
		});
};
yargs.command({
	command: "fist_data_posgre",
	handler: fistData,
});

yargs.parse();

module.exports = {
	sequelize,
	Category,
	Priority,
	Status,
	Users,
	Project,
	TaskType,
	UserAssignProject,
	UserAssignTask,
	Task,
	Comment,
	CommentDetail
};