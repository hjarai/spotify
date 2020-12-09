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
        host_id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'text' },
        date: { type: 'string' },
        imagesrc: { type: 'string' },
      },
    };
  }
}

module.exports = OneList;

