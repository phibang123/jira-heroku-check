const { DataTypes } = require("sequelize");

const createPriorityModel = (sequelize) => {
	return sequelize.define(
		"priority_table",
		{
			priorityId: {
				type: DataTypes.INTEGER, //
				primaryKey: true,
				autoIncrement: true,
				collate: "utf8_unicode_ci",
			},
			priority: {
				type: DataTypes.STRING,
				allowNull: false,
				collate: "utf8_unicode_ci",
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				collate: "utf8_unicode_ci",
			},
			deleted: {
				type: DataTypes.STRING,
				allowNull: true,
				collate: "utf8_unicode_ci",
			},
			alias: {
				type: DataTypes.STRING,
				allowNull: false,
				collate: "utf8_unicode_ci",
			},
		},
		{
			tableName: "priority",
			timestamps: false, //tắt chế độ tự động thêm craeteAt updateAt(failt)
		}
	);
};

module.exports = {
	createPriorityModel,
};
