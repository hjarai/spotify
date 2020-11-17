/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

exports.up = function(knex, Promise) {
  return knex.schema.createTable('OneList', (table) => {
      table.increments('id');
      //host ID and song ID: needs to communicate with other tables
      table.foreign('song_id').references('Song.id').onDelete('cascade');
      table.foreign('host_id').references('Host.id').onDelete('cascade');
      table.string('title');
      table.text('description').notNullable();
      table.string('date');
      table.string('imagesrc');
      table.string('Spotify Playlist ID').unique();
    })

    .createTable('Song', (table) => {
      table.increments('id');
      table.string('title');
      table.string('artist');
      table.string('votes');
      table.string('username');
      table.string('Spotify Track ID').unique();
    })
    
    .createTable('Host', (table) => {
      table.increments('id');
      table.string('spotify user ID');
    });


};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('OneList', 'Host', 'Song');
};
