/*
    Nombre del autor: Benjamin Ramirez Bolaños
    Objetivo del Archivo: Se establecen los metodos para cuando se llame a 
    las funcionalidades de videojuegos
    Fecha: 7/12/2020
*/
var express = require('express');

var ruta = express.Router();

var mongoose = require('mongoose');
require('../models/modelVideojuegos');
const video = mongoose.model('Videojuego');

//Agregar

ruta.post('/',(req, res)=>{

    console.log(req.body);
    var newVideo = {
        IdVideojuego: req.body.IdVideojuego,
        Nombre: req.body.Nombre,
        Genero: req.body.Genero,
        Duracion: req.body.Duracion,
        Plataforma: req.body.Plataforma,        
    }
    var vid = new video(newVideo);

    vid.save().then(() => {
        console.log("Un videojuego fue agregado!!");
        res.send('Un nuevo videojuego agregado correctamente');
    }).catch((error)=> {
        if(error){
            console.log("Un error al agregar el videojuego");
            throw error;
        }
    });
});

//Eliminar
ruta.delete('/:idvideojuego', (req, res) => {
    id= req.params.idvideojuego;
    video.findOneAndRemove({IdVideojuego: id }).then(() => {
        res.send("El videojuego se elimino");
    }).catch((error) => {
        if (error)
            throw error;
    });
});

//Listado
ruta.get('/', (req, res)=>{
    video.find().then((videojuego)=>{
        res.json(videojuego);
    }).catch((error)=>{
        if(error)
            throw error;
    });

});

//lista uno
ruta.get('/:idvideo', (req, res)=>{

    let IdVideojuego=req.params.idvideo;
    video.findOne({IdVideojuego}).then((videojuego)=>{
        res.json(videojuego);
    }).catch((error) => {
        if(error)
            throw error; 
    });
});

//modificar
ruta.put('/', (req, res) => {
    id= req.body.IdVideojuego;
    video.findOne({IdVideojuego: id}).then((videojuego) => {
        console.log(req.body);
        videojuego.Nombre = req.body.Nombre;
        videojuego.Genero = req.body.Genero;

        videojuego.markModified('Nombre');
        videojuego.markModified('Genero');

        videojuego.save().then(() => {
            res.send("Videojuego modificado exitosamente!!");
        }).catch((error) => {
            throw error;
        });
    }).catch((error) => {
        if(error)
            throw error;
    });
});
module.exports = ruta;
