const { db } = require('../Model/root.modal')
const { Category } = require('../Model/root.modal')




const getAllCategory = async () =>
{
  try {
    let category = await Category.findAll();
    return   category
  } catch (error) {
    return error
  }

}




module.exports = {
  getAllCategory: getAllCategory,

}