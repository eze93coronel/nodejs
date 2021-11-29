const express = require('express');
const router  = express.Router();


// importrta exprees validator 
const {body} = require('express-validator')
const proyectosControllers = require('../controllers/proyectoControllers')

const tareasController = require('../controllers/tareasController');

const usuariosControllers = require('../controllers/usuariosControllers');
module.exports = function(){
    //ruta del home

    router.get( '/',proyectosControllers.proyectosHome);
    
    router.get('/nuevo-proyecto',proyectosControllers.formularioProyecto);
        
    router.post('/nuevo-proyecto/',
    body('nombre').not().isEmpty().trim().escape(),
    proyectosControllers.nuevoProyecto);


      //listar proyecto 
      router.get('/proyectos/:url',proyectosControllers.proyectoPorUrl);
      
     //actualizar el proyecto 
     router.get('/proyecto/editar/:id',proyectosControllers.formularioEditar)
   
     router.post('/nuevo-proyecto/:id',
     body('nombre').not().isEmpty().trim().escape(),
     proyectosControllers.actualizarProyecto);

  //eliminara proyecto 
  router.delete('/proyectos/:url',proyectosControllers.eliminarProyecto);
 // ruta para las tareas 
 router.post('/proyectos/:url',tareasController.agregarTarea);

 //actualizar una tarea 
 router.patch('/tareas/:id',tareasController.cambiarEstadoTarea);

 //eliminar una tarea
 router.delete('/tareas/:id',tareasController.eliminarTarea);

 // crear nueva cuenta 
 router.get('/crear-cuenta', usuariosControllers.formCrearCuenta);
 router.post('/crear-cuenta', usuariosControllers.crearCuenta);


    return router;
}
