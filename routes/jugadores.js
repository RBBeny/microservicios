
/*
    Nombre del autor: Benjamin Ramirez Bolaños
    Objetivo del Archivo: Se establecen los metodos para cuando se llame a 
    las funcionalidades de jugadores
    Fecha: 7/12/2020
*/
var express = require('express');

var ruta = express.Router();

var mongoose = require('mongoose');
require('../models/modelJugador');
const juga = mongoose.model('Jugador');

//Agregar

ruta.post('/',(req, res)=>{

    console.log(req.body);
    var newJugador = {
        IdJugador: req.body.IdJugador,        
        NickName: req.body.NickName,
        Nombre: req.body.Nombre,
        Apellidos: req.body.Apellidos,
        Edad: req.body.Edad,        
    }
    var jug = new juga(newJugador);

    jug.save().then(() => {
        console.log("Un Jugador fue agregado!!");
        res.send('Un nuevo Jugador fue  agregado correctamente');
    }).catch((error)=> {
        if(error){
            console.log("Un error al agregar el Jugador");
            throw error;
        }
    });
});

//Eliminar
ruta.delete('/:idjugador', (req, res) => {
    id= req.params.idjugador;
    juga.findOneAndRemove({IdJugador: id }).then(() => {
        res.send("El jugador se elimino");
    }).catch((error) => {
        if (error)
            throw error;
    });
});

//Listado
ruta.get('/', (req, res)=>{
    juga.find().then((jugador)=>{
        res.json(jugador);
    }).catch((error)=>{
        if(error)
            throw error;
    });

});


//lista uno
ruta.get('/:idjugador', (req, res)=>{

    let IdJugador=req.params.idjugador;
    juga.findOne({IdJugador}).then((jugador)=>{
        res.json(jugador);
    }).catch((error) => {
        if(error)
            throw error; 
    });
});

//modificar
ruta.put('/', (req, res) => {
    id= req.body.IdJugador;
    juga.findOne({IdJugador: id}).then((jugador) => {
        console.log(req.body);
        jugador.Nombre = req.body.Nombre;
        jugador.Apellidos = req.body.Apellidos;

        jugador.markModified('Nombre');
        jugador.markModified('Apellidos');

        jugador.save().then(() => {
            res.send("Jugador modificado exitosamente!!");
        }).catch((error) => {
            throw error;
        });
    }).catch((error) => {
        if(error)
            throw error;
    });
});

module.exports = ruta;
