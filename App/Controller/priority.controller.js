//const categoryService = require('../Services/caterory.services')
const priorityServices = require('../Services/priority.services')


const getPriority = async (req, res) =>
{
  try {
    const priorityList = await priorityServices.getAllPriority()
    if (priorityList)
    {
     priority = priorityList.map((e) => {
      return {
        id: e.priorityId,
        priority: e.priority,
        description : e.description,
        deleted: e.deleted,
        alias: e.alias
      }
    });
  
      res.status(200).json({
        success: true, statusCode: 200, content: priority
        
      })
    }
    else
    {
      res.status(400).json({ success: false, statusCode: 404,message: "Not Found" })
    }
    // if (categoryList)
    // {
    
    //   res.status(200).json({ success: true, statusCode: 200, categoryList })
    // }
    // else
    // {
    //   res.status(400).json({ success: true, statusCode: 404,message: "Not Found" })
   
      
    // }
  } catch (error) {
    res.status(400).json({ success: true, statusCode: 404,message: "Not Found" })
  }
}


module.exports = {
  getPriority
}