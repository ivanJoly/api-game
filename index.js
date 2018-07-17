'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.db, { useNewUrlParser: true } , (err, res) => {
    if(err){
        console.log('Error al conectarse a la base de datos' , err);
    }
    console.log('Conexion establecida con la base de datos');
    app.listen(config.port, ()=>{
        console.log('Puerto: ', config.port);
    })
})