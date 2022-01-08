const { DataTypes } = require("sequelize")



const createCommentDetailModel = (sequelize) =>
{
  return sequelize.define("comment_detail_table", {
    id: {
      type: DataTypes.INTEGER, //  
      primaryKey: true,
      autoIncrement: true,
      collate: 'utf8_unicode_ci', 
    },
 
   
  }, {
    tableName: "comment_detail",
    timestamps: true,  //tắt chế độ tự động thêm craeteAt updateAt(failt)
  })
}

module.exports = {
  createCommentDetailModel
}