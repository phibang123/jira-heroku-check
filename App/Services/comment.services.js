const { Comment, Users, Task,CommentDetail } = require("../Model/root.modal");

const getAllCommentFromTask = async (req, res) => {
	try {
		let { taskId } = req;
   
		let comment = await Task.findOne({
			//where: { taskId: taskId },
			include: [
				{
					model: Users,
					as: "TaskComment",	
				},
			],
			where: { taskId: taskId },
		});	
		return comment;
	} catch (error) {
		console.log(error);
	}
};

const insertComment = async (req) => {
	try {
		let { taskId, commentContentId, userId } = req;
		let comment = await CommentDetail.create({
			taskId: taskId,
			userId: userId,
			commentContentId: commentContentId,
		});

		return comment;
	} catch (error) {
		throw new Error();
	}
};


const insertCommentContent = async (req) => {
	try {
		let {  content } = req;
		let commentContent = await Comment.create({	
			content: content,
		});

		return commentContent;
	} catch (error) {
		throw new Error();
	}
};

const findCommentUser = async (req, res) => {
	try {
		let { commentId } = req;

		let commentFind = await CommentDetail.findOne({
			where: {
				id: commentId,
			},
		});
		return commentFind;
	} catch (error) {
		throw new Error();
	}
};

const deleteComment = async (req) => {
	try {
		let { commentId } = req;
		let commentDetail = await CommentDetail.destroy({
			where: { id: commentId },
		});
		return commentDetail
	} catch (error) {
		throw new Error();
	}
};


const deleteCommentContent = async (req) => {
	try {
		let { commentId } = req;
		console.log(commentId,"alo")
		await Comment.destroy({
			where: {  commentId },
		});
	} catch (error) {
		throw new Error();
	}
};
module.exports = {
	getAllCommentFromTask,
	insertComment,
	deleteComment,
	findCommentUser,
	insertCommentContent,
	deleteCommentContent
};
