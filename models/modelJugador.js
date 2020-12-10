const mongoose = require('mongoose');

mongoose.model('Jugador',{
    IdJugador:{
        type:Number,
        require: [true, 'Se requiere un ID'],
        unique: true
    },
    NickName:{
        type:String,
        require: [true, 'Se requiere un Nick']
        

    },
    Nombre:{
        type:String,
        requiere: [true,'Se requiere un nombre']
    },
    
    Apellidos:{
        type:String,
        requiere: [true, 'Se requieren los apellidos']
    },
    Edad:{
        type:Number,
        require: [true, 'Se requiere la edad'],
        min: [1, 'La edad minima es 1'],
        max: [120, 'La edad Maxima es 120']
    }
});