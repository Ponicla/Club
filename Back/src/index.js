const express = require ('express');

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}));


/* Middleware */
app.use(function(req, res, next){
    /* Acceso a conexiones que requieran esta applicacion */
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    //res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//RUTAS
app.use(require('./routes/index'));

app.listen(3000);
var n = new Date();
var options2 = {dataStyle: 'full'}; 
var l = n.toLocaleString("es-AR", options2);
console.log('SERVER RUN ' + l); 