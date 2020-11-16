/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

exports.up = function(knex, Promise) {
    return knex.schema.createTable('Song', (table) => {
        table.increments('id');
        table.string('title');
        table.string('artist');
        table.string('votes');
        table.string('username');
        table.string('Spotify Track ID').unique();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Song');
};

