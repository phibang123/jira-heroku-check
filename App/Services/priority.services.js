const { Priority } = require('../Model/root.modal')



const getAllPriority = async (req, res) =>
{
  try
  {
    
    
    let priorityAll = await Priority.findAll();
    return priorityAll
  } catch (error) {
    return error
  }
}


module.exports = {
  getAllPriority
}