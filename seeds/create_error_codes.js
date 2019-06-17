
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('error').del()
    .then(function () {
      // Inserts seed entries
      return knex('error').insert([
        { error_code: 'CREATE_USER_FAILED', error_message: 'Unable to create {user} user please check your fields.' },
        { error_code: 'FETCH_USER_DETAILS_FAILED', error_message: 'Unable to fetch {user} user details' },
      ]);
    });
};
