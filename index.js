 const express = require('express'); // express sopoeta este llamadon 
const routes = require('./routes');
const path = require('path')
const bodyParser = require('body-parser');
const flash = require('connect-flash');

const expressValidator = require('express-validator');

// helpers con algunas funciones 
const helpers = require('./helpers')

//crear la conexion ala base de datos 
const db = require('./config/db'); 

//impotando los modelos
require('./models/Proyecto');
require('./models/Tareas');
require('./models/Usuarios');



db.sync()
.then(()=>console.log('conectado al servidor'))
.catch(error=>console.log(error))
//crear un app de ecxpress 
const app = express();


//habilitar body parser paar leer datos del form
app.use(bodyParser.urlencoded({extended: true}));

// donde caragr los archivos estaticos 
app.use(express.static('public'))


// han¿bilitar pug    
app.set('view engine','pug')

// añadir las carpetas de las vistas 
app.set('views',path.join(__dirname,'./views'));

//agregar flash messages
app.use(flash());

//pasar var dom  ala app
 
app.use((req,res,next)=>{
    
    res.locals.vardump = helpers.vardump;
    next();
})


//app.use(express.json());
app.use('/',routes());

app.listen(4000); // puerto en el que va correr express 

