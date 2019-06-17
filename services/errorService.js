const knex = require('../db')

exports.createErrorLogs = async (error) => {
  console.log(error.id, "sss")
  try {
    let obj = {
      "error_logs": error.obj,
      "id": error.id
    }
    return await knex('logs').insert(obj).returning(['id'])
  } catch (err) {
    return { error: err, message: "Something went wrong!" };
  }
}