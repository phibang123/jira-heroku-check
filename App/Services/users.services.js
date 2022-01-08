// const { db } = require("../Model/root.modal");
const bcrypt = require("bcryptjs");
const { Users, UserAssignProject, Project } = require("../Model/root.modal");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const createUser = async (users) =>
{
	
	let newUser = await Users.create(users);
	console.log(JSON.stringify(newUser,null,2))
	return newUser;
};

//
const loginUser = async (req, res) => {
	console.log(req);
	const { email, password } = req;
	const findUsers = await Users.findOne({
		where: { email },
		raw: true,
	});
	//console.log(JSON.stringify(findUsers, null, 2));
	return findUsers;
};

//
const updateUser = async (req, res) => {
	let { id, email, password, name, phoneNumber } = req;
	await bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(
			password,
			salt,
			(
				err,
				hash //hash là chuổi paword được băm
			) => {
				if (err) throw err;
				passwordHash = hash;
			}
		);
	});
	//console.log(id, email, password, name, phoneNumber);
	let userId = id;
	const userUpdate = await Users.findOne({
		where: { userId },
	});
	if (userUpdate) {
		userUpdate.email = email;
		userUpdate.password = passwordHash;
		userUpdate.name = name;
		userUpdate.phoneNumber = phoneNumber;

		const userUpdated = await userUpdate.save();

		return userUpdated;
	} else {
		return false;
	}
};

const getAllUSerKey = async (req) => {
	try {
		let { id, key } = req;
		let allUser = await Users.findAll({
			where: {
				[Op.and]: [
					{
						userId: {
							[Op.ne]: id,
						},
					},
					{ name: { [Op.like]: `%${key}%` } },
				],
			},
		});
		return allUser;
	} catch (error) {
		throw new Error();
	}
};

const getAllUSerKeyNull = async (req) => {
	try {
		
		let allUser = await Users.findAll({
			where: {
				userId: {
					[Op.ne]: req,
				},
			},
		});
		return allUser;
	} catch (error) {
		throw new Error();
	}
};

const getUserByProjectId = async (req) => {
	try {
	
		let allUser = await Project.findOne({
			include: [{ model: Users, as: 'UserAssignProject' }],
			where: {projectId: req}
		});
		//console.log(JSON.stringify(allUser, null, 2));
		return allUser
	} catch (error)
	{
		throw new Error();
	}
};
module.exports = {
	createUser: createUser,
	loginUser: loginUser,
	updateUser: updateUser,
	getAllUSerKeyNull: getAllUSerKeyNull,
	getAllUSerKey: getAllUSerKey,
	getUserByProjectId: getUserByProjectId,
};
