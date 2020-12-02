/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

exports.up = function(knex, Promise) {
    return knex.schema.createTable('Song', (table) => {
        table.increments('id');
        table.integer('onelist_id');
        table.foreign('onelist_id').references('OneList.id').onDelete('cascade');
        table.string('title');
        table.string('artist');
        table.string('up');
        table.string('down');
        table.string('username');
        table.string('spotify').unique();
      })
      
      .createTable('Host', (table) => {
        table.increments('id');
        table.string('spotify');
      })
      
      .createTable('OneList', (table) => {
        table.increments('id');
        table.integer('host_id');
        table.foreign('host_id').references('Host.id').onDelete('cascade');
        table.string('title');
        table.text('description').notNullable();
        table.string('date');
        table.string('imagesrc');
        table.string('spotify').unique();
      });

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('OneList', 'Host', 'Song');
};