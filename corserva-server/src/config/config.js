const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'corserva',
    password: 'corserva',
    database: 'corserva',
    host: 'pg_db',
    dialect: 'postgres'
  },
  test: {
    username: 'corserva-test',
    password: 'corserva-test',
    database: 'corserva-test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: 'corserva-prod',
    password: 'corserva-prod',
    database: 'corserva-prod',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
