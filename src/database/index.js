const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'agrocosts',
});

client.connect();

client.query('SELECT * FROM users').then(console.log);
