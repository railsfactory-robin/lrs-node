const knex = require('../db')

exports.createErrorLogs = async (error, data) => {
  try {
    let obj = {
      "error_logs": error.obj,
      "id": error.id
    }
    return await knex('logs').insert(obj).returning(['id'])
  } catch (err) {
    let error_code = await knex('error').where({ error_code: 'CREATE_USER_FAILED' })
    return { error: err, message: this.getErrorParser(error_code[0].error_message, data) };
  }
}

exports.extractTextWithinBrackets = (str) => {
  const match = /{([^}]+)}/g;
  let fields = [], field;
  while ((field = match.exec(str))) {
    fields.push(field[1]);
  }
  return fields;
}

exports.getErrorParser = (str, data) => {
  const fields = this.extractTextWithinBrackets(str)
  fields.map((item) => {
    str = str.replace(`{${item}}`, data[item]);
  })
  return str;


}