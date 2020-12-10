/*
    Nombre del autor: Benjamin Ramirez Bolaños
    Objetivo del Archivo: Se establecen los metodos para cuando se llame a 
    las funcionalidades de Registros
    Fecha: 7/12/2020
*/
var express = require('express');

var ruta = express.Router();

var mongoose = require('mongoose');
require('../models/modelRegistro');
const regis = mongoose.model('Registro');

//Agregar

ruta.post('/',(req, res)=>{

    console.log(req.body);
    var newRegistro = {
        IdRegistro: req.body.IdRegistro,
        IdVideojuego: req.body.IdVideojuego,
        IdJugador: req.body.IdJugador,
        HorasJugadas: req.body.HorasJugadas,
        Calificacion: req.body.Calificacion,        
    }
    var reg = new regis(newRegistro);

    reg.save().then(() => {
        console.log("Un registro fue agregado!!");
        res.send('Un nuevo registro agregado correctamente');
    }).catch((error)=> {
        if(error){
            console.log("Un error al agregar el registro");
            throw error;
        }
    });
});

//Eliminar
ruta.delete('/:idregistro', (req, res) => {
    id= req.params.idregistro;
    regis.findOneAndRemove({IdRegistro: id }).then(() => {
        res.send("El registro se elimino");
    }).catch((error) => {
        if (error)
            throw error;
    });
});

//Listado
ruta.get('/', (req, res)=>{
    regis.find().then((registro)=>{
        res.json(registro);
    }).catch((error)=>{
        if(error)
            throw error;
    });

});

//lista uno
ruta.get('/:idregistro', (req, res)=>{

    let IdRegistro=req.params.idregistro;
    regis.findOne({IdRegistro}).then((registro)=>{
        res.json(registro);
    }).catch((error) => {
        if(error)
            throw error; 
    });
});

//modificar
ruta.put('/', (req, res) => {
    id= req.body.IdRegistro;
    regis.findOne({IdRegistro: id}).then((registro) => {
        console.log(req.body);
        registro.HorasJugadas = req.body.HorasJugadas;
        registro.Calificacion = req.body.Calificacion;

        registro.markModified('HorasJugadas');
        registro.markModified('Calificacion');

        registro.save().then(() => {
            res.send("Registro modificado exitosamente!!");
        }).catch((error) => {
            throw error;
        });
    }).catch((error) => {
        if(error)
            throw error;
    });
});

module.exports = ruta;
