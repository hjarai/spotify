const { Model } = require('objection');

class Song extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'Song';
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        artist: { type: 'string' },
        up: { type: 'string' },
        down: { type: 'string' },
        spotify: { type: 'string' },
      },
    };
  }
}

module.exports = Song;

