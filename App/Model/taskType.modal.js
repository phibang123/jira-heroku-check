const { DataTypes } = require("sequelize")



const createTaskTypeModel = (sequelize) =>
{
  return sequelize.define("tasktype_table", {
    typeId: {
      type: DataTypes.INTEGER, //  
      primaryKey: true,
      autoIncrement: true,
      collate: 'utf8_unicode_ci', 
    },
    taskType: {
      type: DataTypes.STRING, 
      allowNull: false,
      collate: 'utf8_unicode_ci', 
      unique: true
    }
  }, {
    tableName: "tasktype",
    timestamps: false,  //tắt chế độ tự động thêm craeteAt updateAt(failt)
  })
}

module.exports = {
  createTaskTypeModel
}