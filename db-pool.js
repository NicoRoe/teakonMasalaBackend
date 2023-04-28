const pg = require('pg');
require('dotenv').config();

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABSE } = process.env;

//  ----- client vs pool ?

const pool = new pg.Pool({
  PGUSER,
  PGPASSWORD,
  PGDATABSE,
  PGPORT,
  PGHOST,
});

module.exports = pool;











