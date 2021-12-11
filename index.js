 const express = require('express'); // express sopoeta este llamadon 
const routes = require('./routes');
const path = require('path')
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
//importra las varaibles env
require('dotenv').config({path:'variables.env'})

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


// donde caragr los archivos estaticos 
app.use(express.static('public'))


// han¿bilitar pug    
app.set('view engine','pug')

//habilitar body parser paar leer datos del form
app.use(bodyParser.urlencoded({extended: true}));


// añadir las carpetas de las vistas 
app.set('views',path.join(__dirname,'./views'));

//agregar flash messages
app.use(flash());
// cookie parser 
app.use(cookieParser());

//session nos permite navegar en distintas paginas sin volvernos a autenticar 
app.use(session({
    secret: 'Supersecreto',
    resave:false,
    saveUninitialized : false
}));

//passpor 
app.use(passport.initialize());
app.use(passport.session());

//pasar var dom  ala app
 
app.use((req,res,next)=>{

    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
  
    next();
})


//app.use(express.json());
app.use('/',routes());

 

//require('./handlers/email');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;
app.listen(port,host, ()=>{
    console.log('el servidor esta funcionando')
});