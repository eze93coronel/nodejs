const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('../models/Proyecto');
const bcrypt = require('bcryptjs');


const Usuarios = db.define('usuarios',{
    id:{
       type: Sequelize.INTEGER,
       primaryKey:true,
       autoIncrement:true
    },
    email:{
         type:Sequelize.STRING(60),
         allowNull:false,
         validate:{
             isEmail:{
                 msg:'Agrega un Correo Valido'
             },
             notEmpty:{
                msg:'El Email no puede ir Vacio'
            }
         },
         unique:{
             args:true,
             msg:'Usuario Ya Registrado'
         }
    },
    password:{
          type: Sequelize.STRING(60),
          allowNull:false,
          validate:{
              notEmpty:{
                  msg:'El Password no puede ir Vacio'
              }

          }
    }
},{
    hooks:{
        beforeCreate(usuario){
           usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
});
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
