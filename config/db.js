const  Sequelize  = require('sequelize');

// Option 1: Passing a connection URI


// Option 3: Passing parameters separately (other dialects)
const db= new Sequelize('uptasknode', 'root', 'root', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql' ,
  define :{
      timestamps:false
  }, 
  pool:{
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
});
module.exports = db;