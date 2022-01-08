const { DataTypes } = require("sequelize")



const createCategoryModel = (sequelize) =>
{
  return sequelize.define("category_table", {
    categoryId: {
      type: DataTypes.INTEGER, //  
      primaryKey: true,
      autoIncrement: true,
      collate: 'utf8_unicode_ci', 
    },
    categoryName: {
      type: DataTypes.STRING, 
      allowNull: false,
      collate: 'utf8_unicode_ci', 
      unique: true
    },
    
  }, {
    tableName: "category",
    timestamps: false,  //tắt chế độ tự động thêm craeteAt updateAt(failt)
  })
}

module.exports = {
  createCategoryModel
}