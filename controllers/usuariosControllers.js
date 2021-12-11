const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

exports.formCrearCuenta = (req,res)=>{
  res.render('crearCuenta',{
      nombrePagina : 'Crear cuenta en uptask'
  });
}

exports.formIniciarSesion = (req,res)=>{
  const {error} = res.locals.mensajes;
  res.render('iniciarSesion',{
      nombrePagina : 'inicia secion en uptask',
      error
  });
}


exports.crearCuenta = async(req,res)=>{
 // leer los datos 
 const {email,password}= req.body;

  try {
      // crearaa un usuario
       await Usuarios.create({
           email,
           password
       });
 // crear un aurl de connfirmar 
 const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

 //crear ael objeto d usuario 
const usuario = {
  email
}

 // enviar email 

 await enviarEmail.enviar({
  usuario,
  subject : 'Confirma tu cuenta Uptask',
  confirmarUrl,
  archivo: 'confirmar-cuenta'
});

 //redirigir el usuario
     req.flash('correcto','Enviamos un correo, Confirma tu Cuenta' );
       res.redirect('/iniciar-sesion')
  } catch (error) {
    req.flash('error',error.errors.map(error =>error.message));
    res.render('crearCuenta',{
        mensajes: req.flash(),
        nombrePagina : 'Crear cuenta en uptask',
        email,
        password
    });
  }
 


}

exports.formRestablecerPassword = (req,res)=>{

  res.render('reestablecer',{
    nombrePagina:'Reestablecer tu Contraseña'
  })
}

exports.confirmarCuenta = async (req,res)=>{
   
  const usuario = await Usuarios.findOne({
    where :{
      email: req.params.correo
    }
  });

  // si el usuario no existe 
  if(!usuario){
    req.flash('error','No valido Man');
    res.redirect('/crear-cuenta');
  }
  
  usuario.activo = 1;
  await usuario.save();

  req.flash('correcto','Cuenta creada correctamente..');
  res.redirect('/iniciar-sesion');

}