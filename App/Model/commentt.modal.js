const { DataTypes } = require("sequelize")



const createCommentModel = (sequelize) =>
{
  return sequelize.define("comment_table", {
    commentId: {
      type: DataTypes.INTEGER, //  
      primaryKey: true,
      autoIncrement: true,
      collate: 'utf8_unicode_ci', 
    },
    content: {
      type: DataTypes.TEXT, 
      allowNull: false,
      collate: 'utf8_unicode_ci', 
    },
   
  }, {
    tableName: "comment",
    timestamps: true,  //tắt chế độ tự động thêm craeteAt updateAt(failt)
  })
}

module.exports = {
  createCommentModel
}