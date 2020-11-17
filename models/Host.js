const { Model } = require('objection');

class Host extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'Host';
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        spotify: { type: 'string' },
      },
    };
  }
}

module.exports = Host;

