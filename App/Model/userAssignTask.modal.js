const { DataTypes } = require("sequelize")



const createUsersAssignTaskModel = (sequelize) =>
{
  return sequelize.define("user_Assign_Task_table", {
    userAssignTaskId: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true,
      collate: 'utf8_unicode_ci', 
    },
   
  }, {
    tableName: "users_assign_task",
    timestamps: true  //tắt chế độ tự động thêm craeteAt updateAt(failt)
  })
}

module.exports = {
  createUsersAssignTaskModel
}