const { Model } = require('objection');

class OneList extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'OneList';
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],

      properties: {
        id: { type: 'integer' },
        song_id: { type: 'integer' },
        host_id: { type: 'integer' },
        title: { type: 'string' },
        description: { type: 'text' },
        date: { type: 'string' },
        imagesrc: { type: 'string' },
        spotify: { type: 'string' },
      },
    };
  }
}

module.exports = OneList;

