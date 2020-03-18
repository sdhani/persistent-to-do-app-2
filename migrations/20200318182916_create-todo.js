
exports.up = function(knex) {
  return knex.schema.createTable('todo', (table) => {
    table.increments(); // id PK serial
    table.string('content').notNullable();
    table.boolean('completed').notNullable().defaultTo(false);
    table.boolean('deleted').notNullable().defaultTo(false);
    table.integer('user_id').references('id').inTable('users');
  });

};

exports.down = function(knex) {
  return knex.schema.dropTable('todo');
};