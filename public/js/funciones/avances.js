 export const actualizarAvance = ()=>{
     // seleciionar tareas 
     const tareas = document.querySelectorAll('li.tarea'); 
  
     if(tareas.lenght){
           
     // seleccionar tareas completadas 
const tareasCompletas = document.querySelectorAll('i.completo');

     // calcular el avance 
  const avance = Math.round((tareasCompletas.length / tareas.length) * 100);
     // mostraer el avance 
  const porcentaje = document.querySelector('#porcentaje');

  porcentaje.style.width = avance+'%';

     } 

 } 

 