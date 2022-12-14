const {Sequelize} = require('sequelize');
const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const sequelize = new Sequelize(config.dbName,USER,PASSWORD,{
  host: config.dbHost,
  dialect: config.dbDialet,
  port: config.dbPort,
 

});

setupModels(sequelize);


module.exports = sequelize;


//para migracion instalamos npm i sequelize-cli --save-dev