const categoryService = require('../Services/caterory.services')



const getCategory = async (req, res) =>
{
  try {
    const categoryList = await categoryService.getAllCategory()

    if (categoryList)
    {
      category = categoryList.map((e) =>
      (
         {
          id: e.categoryId,
          projectCategoryName: e.categoryName
        }
      ))
      res.status(200).json({ success: true, statusCode: 200, content: category})
    }
    else
    {
      res.status(400).json({ success: true, statusCode: 404,message: "Not Found" })
   
      
    }
  } catch (error) {
    res.status(400).json({ success: true, statusCode: 404,message: "Not Found" })
  }
}


module.exports = {
  getCategory
}