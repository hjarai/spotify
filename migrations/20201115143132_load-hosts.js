
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Host', (table) => {
        table.increments('id');
        table.string('spotify user ID');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Host');
  
};
