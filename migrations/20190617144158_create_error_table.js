
exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('error', function (table) {
      table.string('error_code', 255).notNullable().primary();
      table.string('error_message', 255).notNullable();
    })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("error");
};
