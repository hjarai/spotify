/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

exports.up = function(knex, Promise) {
    return knex.schema.createTable('Song', (table) => {
        table.increments('id');
        table.integer('onelist_id');
        table.foreign('onelist_id').references('OneList.id').onDelete('cascade');
        table.string('title');
        table.string('artist');
        table.integer('vote');
        table.string('username');
        table.string('spotify_id');
        table.string('songUrl');
        table.string('uri');
      })
      
      .createTable('OneList', (table) => {
        table.increments('id');
        table.string('host_spotify');
        table.string('title');
        table.text('description').notNullable();
        table.string('date');
        table.string('imagesrc');
      });

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('OneList').dropTableIfExists('Host').dropTableIfExists('Song');
};