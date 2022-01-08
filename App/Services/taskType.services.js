const { TaskType } = require('../Model/root.modal')




const getAllTaskType = async (req, res) =>
{
  
  try
  {
  
    let taskTypeAll = await TaskType.findAll();
    
    
    return taskTypeAll
  } catch (error) {
    return error
  }
}

module.exports = {
  getAllTaskType:  getAllTaskType
}