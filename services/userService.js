const knex = require('../db')

exports.getAllUsers = async () => {
  return await knex('users').select()
}

exports.createUser = async (user) => {
  try {
    const data = {
      name: user.name,
      username: user.username,
      password: user.password,
      phone: user.phone,
      email: user.email,
      created_on: new Date()
    }
    return await knex('users').insert(data).returning('*')
  } catch (err) {
    return { error: err, message: "Something went wrong!" };
  }
}

exports.updateUser = async (id, user) => {
  try {
    return await knex('users')
      .where({ user_id: parseInt(id) })
      .update(user)
      .returning('*')
  } catch (err) {
    return { error: err, message: "Something went wrong!" };
  }
}

exports.deleteUser = async (id) => {
  try {
    return await knex('users')
      .where({ user_id: parseInt(id) })
      .del()
  } catch (err) {
    return { error: err, message: "Something went wrong!" };
  }
}

exports.getUserById = async (id) => {
  try {
    return await knex('users').where({ user_id: id })
  } catch (err) {
    return { error: err, message: "Something went wrong!" };
  }
}