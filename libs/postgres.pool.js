
const {Pool } = require('pg');

const pool = new Pool({

  host:'localhost',
  port:5432,
  user:'nico',
  password:'admin123',
  database: 'my_store'
});


module.exports = pool;



/* para proteger variables


const { Pool } = require('pg');
const {config}= require('./../config/config');

const USER = encodeURIComponent(config.dbUser)  //codificar la variable
const PASWORD = encodeURIComponent(config.dbPassword)
const URI = `postgres://${USER}:${PASWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const pool = new Pool({connectionString: URI});



  const pool = new Pool({
  host:'localhost',
  port:5432,
  user:'nico',
  password:'admin123',
  database: 'my_store'
})


module.exports = pool;

*/
