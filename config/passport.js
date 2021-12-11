const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

// referrenacia al modelo donde vamos a autenticar 
const Usuarios = require('../models/Usuarios');

//locasl strategy == login con creacion de usuarrios 
passport.use(
    new LocalStrategy(
        // por default passport espera un usuario y password 
        {
            usernameField : 'email',
            passwordField: 'password'
        },
        async(email,password,done)=>{
           
            try {
                const usuario = await Usuarios.findOne({
                    where : {
                        email,
                        activo: 1
                    
                    }
                })
                // el usario existe passworrd incorrecto 
                if(!usuario.verificarPassword(password)){
                    return done(null,false,{
                        message : 'Password Incorrecto'
                    })
                }
                 // el amil existe retorna el ususrio 
                 return done(null, usuario);
            } catch (error) {
                // ese ususario no existe 
                return done(null,false,{
                    message : 'Esa Cuenta No Existe'
                })
            }
        }
    )

)
//sererializar el usuario 
passport.serializeUser((usuario,callback)=>{
    callback(null,usuario);
});
// deserializar el usuario
passport.deserializeUser((usuario,callback)=>{
    callback(null,usuario);
});

 // exportar 
 module.exports = passport;
