const mongoose = require('mongoose');

mongoose.model('Registro',{
    IdRegistro:{
        type:Number,
        require: [true, 'Se requiere un ID'],
        unique: true
    },
    IdVideojuego:{
        type:String,
        require: [true, 'Se requiere un id videojuego']
        

    },
    IdJugador:{
        type:String,
        requiere: [true,'Se requiere un id jugador']
    },
    
    HorasJugadas:{
        type:Number,
        requiere: [true, 'Se requieren las horas']
    },
    Calificacion:{
        type:Number,
        require: [true, 'Se requiere la calificacion'],
        min: [1, 'La calificacion minima es 1'],
        max: [120, 'La calificacion Maxima es 10']
    }
});