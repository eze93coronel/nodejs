const Proyecto = require('../models/Proyecto');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req,res,next)=>{
    //obtenemos el proyecto actual
    const proyecto = await Proyecto.findOne({where: {url : req.params.url}});
   
    //leer el valor del input 
    const {tarea} = req.body;
   
    // estado 0 igual a incompleto y id de proyectos
    const estado = 0;
    const proyectoId = proyecto.id;

    // insertar en la base de datos 
    const resultado = await Tareas.create({tarea, estado,proyectoId});

    if(!resultado){
        return next();
    }

    // REDIRECCIONAR 
    res.redirect(`/proyecto/${req.params.url}`);
}

exports.cambiarEstadoTarea = async(req,res)=>{

    const {id}= req.params;
    const tarea = await Tareas.findOne({where:{id}});

     // cambiar el estado 
     let estado = 0;

     if(tarea.estado === estado ){
         estado = 1
     }
     tarea.estado = estado;

     const resultado = await tarea.save();

     if(!resultado) return next();

    res.status(200).send('actualizado broo..');
}
exports.eliminarTarea =async (req,res)=>{

    const {id} = req.params;
   //delete aa tarea 
    const respuesta = await Tareas.destroy({where:{id}});

   if(!respuesta) return next();

    
   res.status(200).send('Tarea eliminada');
}