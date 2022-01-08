const { DataTypes } = require("sequelize")



const createStatusModel = (sequelize) =>
{
  return sequelize.define("status_table", {
    statusId: {
      type: DataTypes.STRING, //  
      allowNull: false,
      primaryKey: true,
      collate: 'utf8_unicode_ci', 
    },
    statusName: {
      type: DataTypes.STRING, 
      allowNull: false,
      collate: 'utf8_unicode_ci', 
      unique: true
    },
    alias: {
      type: DataTypes.STRING, 
      allowNull: false,
      collate: 'utf8_unicode_ci', 
      unique: true
    },
  }, {
    tableName: "status",
    timestamps: false,  //tắt chế độ tự động thêm craeteAt updateAt(failt)
  })
}

module.exports = {
  createStatusModel
}