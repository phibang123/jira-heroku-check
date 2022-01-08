const { DataTypes } = require("sequelize")


const createUsersModel = (sequelize) =>
{
  return sequelize.define("user_table", {
    userId: {
      type: DataTypes.INTEGER, //  
      primaryKey: true,
      autoIncrement: true,
      collate: 'utf8_unicode_ci', 
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false,
      collate: 'utf8_unicode_ci', 
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      collate: 'utf8_unicode_ci', 
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false,
      collate: 'utf8_unicode_ci', 
    },
    avatar: {
      type: DataTypes.TEXT, 
      allowNull: false,
      collate: 'utf8_unicode_ci', 
    },
    phoneNumber: {
      type: DataTypes.STRING, 
      allowNull: false,
      collate: 'utf8_unicode_ci', 
    }
  }, {
    tableName: "users",
    timestamps: true  //tắt chế độ tự động thêm craeteAt updateAt(failt)
  })
}

module.exports = {
  createUsersModel
}