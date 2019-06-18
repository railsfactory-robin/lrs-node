const knex = require('../db')

exports.createErrorLogs = async (error) => {
  try {
    let obj = {
      "error_logs": error.obj,
      "id": error.id
    }
    return await knex('logs').insert(obj).returning(['id'])
  } catch (err) {
    let error_code = await knex('error').where({ error_code: 'CREATE_USER_FAILED' })
    return { error: err, message: getErrorParser(error_code[0].error_message) };
  }
}

function getErrorParser(str) {
  let sampleJson = {
    user: "Robin Thomas",
    date: '17/06/2019'
  }
  const regex = /\{([^}]+)\}/gm;
  let array_data = str.match(regex)
  array_data.map((item, index) => {
    let result = item.substring(1, item.length - 1);
    str = str.replace(`{${result}}`, sampleJson[result]);
  })
  return str;
}

