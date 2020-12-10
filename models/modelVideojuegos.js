


const mongoose = require('mongoose');

mongoose.model('Videojuego',{
    IdVideojuego:{
        type:Number,
        require: [true, 'Se requiere un ID'],
        unique: true
    },
    Nombre:{
        type:String,
        requiere: [true,'Se requiere un nombre']
    },
    Genero:{
        type:String,

    },
    Duracion:{
        type:String,
        requiere: [true, 'Se requiere una duracion']
    },
    Plataforma:{
        type:String,
        require: [true, 'Se requiere una Plataforma']
    }
});