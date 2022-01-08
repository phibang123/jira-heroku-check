const { DataTypes } = require("sequelize");


const createProjectModel = (sequelize) => {
	return sequelize.define(
		"project_table",
		{
			projectId: {
				type: DataTypes.INTEGER, //
				primaryKey: true,
				autoIncrement: true,
				collate: "utf8_unicode_ci",
			},
			projectName: {
				type: DataTypes.STRING,
        allowNull: false,
        unique: true,
				collate: "utf8_unicode_ci",
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
				collate: "utf8_unicode_ci",
      },
      
			alias: {
				type: DataTypes.STRING,
				allowNull: true,
				collate: "utf8_unicode_ci",
      },
      createProjectDate: {
				type: DataTypes.DATE,
        allowNull: false,
        collate: "utf8_unicode_ci",
        defaultValue: DataTypes.NOW
			},
		},
		{
			tableName: "project",
			timestamps: true, //tắt chế độ tự động thêm craeteAt updateAt(failt)
		}
		
	);
};

module.exports = {
	createProjectModel,
};
