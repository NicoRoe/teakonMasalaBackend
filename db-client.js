const pg = require('pg');
require('dotenv').config();

const connectString = `${process.env.DB_CONNECTION_STRING}` //Can be found in the Details page
const client = new pg.Client(connectString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }

});

module.exports = client;


