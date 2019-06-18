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
    let sampleJson = {
      user: "Robin",
      date: '17/06/2019'
    }
    str = error_code[0].error_message;
    // str = 'Unable to create {user} user please {date} your fields.'
    const regex = /\{([^}]+)\}/gm;
    let array_data = str.match(regex)
    array_data.map((item, index) => {
      let result = item.substring(1, item.length - 1);
      str = str.replace(`{${result}}`, sampleJson[result]);
    })
    return { error: err, message: str };
  }
}




