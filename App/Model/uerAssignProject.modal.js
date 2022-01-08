const { DataTypes } = require("sequelize")



const createUsersAssignProjectModel = (sequelize) =>
{
  return sequelize.define("user_Assign_Project_table", {
    userAssignProjectId: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true,
      collate: 'utf8_unicode_ci', 
    },
   
  }, {
    tableName: "users_assign_project",
    timestamps: true  //tắt chế độ tự động thêm craeteAt updateAt(failt)
  })
}

module.exports = {
  createUsersAssignProjectModel
}