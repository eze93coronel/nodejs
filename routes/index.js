const express = require('express');
const router  = express.Router();


// importrta exprees validator 
const {body} = require('express-validator/check')
const proyectosControllers = require('../controllers/proyectoControllers')

const tareasController = require('../controllers/tareasController');

const usuariosControllers = require('../controllers/usuariosControllers');

const authController = require('../controllers/authControllers'); 

module.exports = function(){
    //ruta del home

    router.get( '/',
    authController.usuarioAutenticado,
    proyectosControllers.proyectosHome);
    
    router.get('/nuevo-proyecto',
    authController.usuarioAutenticado,
    proyectosControllers.formularioProyecto);
        
    router.post('/nuevo-proyecto/',
    authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),
    proyectosControllers.nuevoProyecto);


      //listar proyecto 
      router.get('/proyectos/:url',
      authController.usuarioAutenticado,
      proyectosControllers.proyectoPorUrl);
      
     //actualizar el proyecto 
     router.get('/proyecto/editar/:id',authController.usuarioAutenticado,proyectosControllers.formularioEditar)
   
     router.post('/nuevo-proyecto/:id',
     authController.usuarioAutenticado,
     body('nombre').not().isEmpty().trim().escape(),
     proyectosControllers.actualizarProyecto);

  //eliminara proyecto 
  router.delete('/proyectos/:url',authController.usuarioAutenticado,proyectosControllers.eliminarProyecto);
 // ruta para las tareas 
 router.post('/proyectos/:url',authController.usuarioAutenticado,tareasController.agregarTarea);

 //actualizar una tarea 
 router.patch('/tareas/:id',authController.usuarioAutenticado,tareasController.cambiarEstadoTarea);

 //eliminar una tarea
 router.delete('/tareas/:id',authController.usuarioAutenticado,tareasController.eliminarTarea);

 // crear nueva cuenta 
 router.get('/crear-cuenta', usuariosControllers.formCrearCuenta);
 router.post('/crear-cuenta', usuariosControllers.crearCuenta);
  router.get('/confirmar/:correo',usuariosControllers.confirmarCuenta);
 // iniciar sesion 
 router.get('/iniciar-sesion', usuariosControllers.formIniciarSesion);

 router.post('/iniciar-sesion',authController.autenticarUsuario);

 //cerra-sesion 
router.get('/cerrar-sesion',authController.cerrarSesion);

// restablecer cuenta 
router.get('/reestablecer',usuariosControllers.formRestablecerPassword);
router.post('/reestablecer',authController.enviarToken);
router.get('/reestablecer/:token',authController.validarToken);
router.post('/reestablecer/:token',authController.actualizarPassword);




    return router;
}
