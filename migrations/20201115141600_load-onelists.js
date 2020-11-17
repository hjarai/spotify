/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

exports.up = function(knex, Promise) {
    return knex.schema.createTable('OneList', (table) => {
        table.increments('id');
        //host ID and song ID: needs to communicate with other tables
        table.string('title');
        table.text('description').notNullable();
        table.string('date');
        table.string('imagesrc');
        table.string('Spotify Playlist ID').unique();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('OneList');
};
