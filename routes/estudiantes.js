var express = require('express');
var ruta = express.Router();

//Conectando a la BD
var mongoose = require('mongoose');
require('../models/modelEstudiante');
const Estudiante = mongoose.model('Estudiante');


//Metodo POST agrega estudiante
ruta.post('/',(req, res)=>{

    console.log(req.body);
    var newEstudiante = {
        NumeroControl: req.body.NumeroControl,
        Nombre: req.body.Nombre,
        Apellidos: req.body.Apellidos,
        Edad: req.body.Edad,
        Email: req.body.Email
    }
    var student = new Estudiante(newEstudiante);

    student.save().then(() => {
        console.log("Un estudiante fue agregado!!");
        res.send('Un nuevo estudiante agregado correctamente');
    }).catch((error)=> {
        if(error){
            console.log("Un error al agregar el estudiante");
            throw error;
        }
    });
});

//Meotodo GET 
ruta.get('/', (req, res)=>{
    Estudiante.find().then((estudiantes)=>{
        res.json(estudiantes);
    }).catch((error)=>{
        if(error)
            throw error;
    });
});

ruta.get('/:numerocontrol', (req, res)=>{

    let Numero=req.params.numerocontrol;
    Estudiante.find({Numero}).then((estudiante)=>{
        res.json(estudiante);
    }).catch((error) => {
        if(error)
            throw error; 
    });
});





//Modifica registro PUT
ruta.put('/',(req, res)=>{
    res.send('Modificando registro de estudiante');
});

//Elimina registro PUT
ruta.delete('/:numerocontrol',(req, res)=>{
    res.send('Eliminando un registro de estudiante');
});

module.exports = ruta;