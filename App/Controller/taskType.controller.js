const taskTypeServices = require('../Services/taskType.services')

const getTaskType = async (req, res) =>
{
  
	try
	{

    const taskTypeList = await taskTypeServices.getAllTaskType()
		if (taskTypeList)
		{
			
			const taskType = taskTypeList.map((e) => (
				{
					id: e.typeId,
					taskType: e.taskType
				}
			))
			res.status(200).json({
				success: true,
				statusCode: 200,
				content: taskType,
			});
		} else {
			res
				.status(400)
				.json({ success: true, statusCode: 404, message: "Not Found" });
		}
  } catch (error) {
    res
				.status(400)
				.json({ success: true, statusCode: 404, message: "Not Found" });
  }
}



module.exports = {
  getTaskType: getTaskType
}