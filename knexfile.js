module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://postgres:postgres@localhost/persistent-todo'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
