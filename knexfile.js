// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './OneList.sqlite3'
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './OneList-test.sqlite3',
    },
    useNullAsDefault: true,
    seeds: {
      directory: './seeds/test',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
  },

};