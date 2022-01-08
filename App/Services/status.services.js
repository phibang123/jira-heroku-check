const {Status} = require('../Model/root.modal')


const getAllStatus = async (req, res) =>
{
  try {
    let statusAll = await Status.findAll();

    return   statusAll
  } catch (error) {
    return error
  }

}


module.exports = {
  getAllStatus: getAllStatus
}