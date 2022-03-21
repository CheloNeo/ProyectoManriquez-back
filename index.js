const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();


//inicializamos la app
let app = express();


// Proteccion de rutas

let corsOptions = {
    origin:'http://localhost:4200/',
    optionsSuccessStatus: 200,
    methods: "GET , PUT , POST , DELETE"
};


// en este caso se permitiran consultas de hasta 100mb para los tokens
let bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit: '100mb'
}));

//database
require('./mongo-db');



app.use(morgan('dev'));
app.use(express.json());
// app.use(cors(corsOptions));

// Ocuparemos las opciones de cors 
app.use(cors()); 

app.use('/api',require('./routes/routes'));

//configuracion del puerto
app.set('port', process.env.PORT || 4000);

//SERVIDOR
app.listen(app.get('port'),()=>{
    console.log("Esta corriendo en el puerto",app.get('port'));
});



