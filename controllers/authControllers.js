const passport = require('passport'); 
const Usuarios = require('../models/Usuarios');
const { Op } = require("sequelize");
 const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const enviarEmail = require('../handlers/email');

exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : 'iniciar-sesion',
    failureFlash : true,
    badRequestMessage : 'Ambos Campos son Obligatorios'
});

//FUNC PARA VER SI EL USUARIO ESTA LOGUEADO O NO 
exports.usuarioAutenticado = (req,res,next)=>{
  //s el usuario eta autenticado, adelante
  if(req.isAuthenticated()){
      return next();
  } 

  //si no lo esta, reedirigir el form
   return res.redirect('/iniciar-sesion');
}

// func para cerrar sesion 
exports.cerrarSesion = (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/iniciar-sesion'); // nos lleva a este login al cerrar la sesion
        
    })
}

//genera un token si usuario es valido 
exports.enviarToken = async(req,res)=>{
    const {email }= req.body;
  const usuario = await Usuarios.findOne({where : {email}})

  // si no existe el usuario 
  if(!usuario){
      req.flash('error','No existe esa cuenta');
      res.redirect('/reestablecer');
  }
  //usuario existe 
  usuario.token = crypto.randomBytes(20).toString('hex');
   usuario.expiracion = Date.now() + 3600000;

   //guradarlos en la base de datos 
   await usuario.save();

   //url de reset 
   const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
    
   // enviar el correo con el token 

   await enviarEmail.enviar({
       usuario,
       subject : 'Password Reset',
       resetUrl,
       archivo: 'restablecer-password'
   });
  //terminar 
  req.flash('correcto','Se envio un mensaje a tu correo');
  res.redirect('/iniciar-sesion');

}
exports.validarToken= async(req,res)=>{
    const usuario = await Usuarios.findOne({
        where : {
             token: req.params.token
        }
    });
    // si no encuentra el usuario 
    if(!usuario){
        req.flash('error','No Valido');
        res.redirect('/reestablecer');
    }
    // formulario para generar password 
    res.render('resetPassword',{
        nombrePagina: 'Reestablecer Contraseña'
    });
}

// cambia password por uno nuevo 
exports.actualizarPassword = async(req,res)=>{
    //verifica un token valido pero tambien la fecha de espiracion
    const usuario = await Usuarios.findOne({
        where : {
            token : req.params.token,
            expiracion: {
                [Op.gte] : Date.now()
            }
        }
    });
    //verficamos si el usuario exist
    if(!usuario){
        req.flash('error','No Valido');
        res.redirect('/reestablecer');
    }
    // haashear el nuevo password 
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null; 

    //guardamos el nuevo passwor
     await usuario.save();
  
     req.flash('correcto','Tu Password se ha Modificado Correctamente');
     res.redirect('/iniciar-sesion');
};