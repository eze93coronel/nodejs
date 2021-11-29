import axios from "axios";
import Swal from "sweetalert2";
const tareas = document.querySelector('.listado-pendientes');

if(tareas){
    
    tareas.addEventListener('click',e =>{
        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            // req hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;

          axios.patch(url,{idTarea})
               .then(function(respuesta){
                 if(respuesta.status === 200){
                   icono.classList.toggle('completo');
                 }
               });
        }
        if(e.target.classList.contains('fa-trash')){
           
          const tareaHtml = e.target.parentElement.parentElement,
              idTarea = tareaHtml.dataset.tarea;

                 
    Swal.fire({
      title: 'deseas eliminar una tarea ?',
      text: "una Tarea Eliminada no se Puede Recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: ' Si, Borrar!',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
         
        const url = `${location.origin}/tareas/${idTarea}`;


       // vamos envaiar delete por medio de axios 
       axios.delete(url,{params: {idTarea}})
            .then(function(respuesta){
                  if(respuesta.status === 200){
              console.log(respuesta);

                     //eliminar el nodo 
                     tareaHtml.parentElement.removeChild(tareaHtml);
                     
                     //opcional una alert 
                     Swal.fire(
                       'Tarea eliminada',
                       respuesta.data,
                       'success'
                     )
                  }
            })
      
      } 
      });
        }
    })
  
  }
export default tareas;