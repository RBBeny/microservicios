
const mongoose = require('mongoose');

mongoose.model('Estudiante',{
    NumeroControl:{
        type:Number,
        require: [true, 'Se requiere un numero de Control'],
        
    },
    Nombre: {
        type:String,
        require: [true, 'Se requiere un nombre para el estudiante'],
        lowercase: true,
        minlength: [3, 'Se requieren almenos tres caracteres']
    },
    Apellidos: {
        type:String,
        require: [true, 'Se requiere un Apellidos para el estudiante'],
        lowercase: true,
        minlength: [3, 'Se requieren almenos tres caracteres']
    },
    Edad: {
        type:Number,
        required: true,
        min: [1, 'La edad minima es 1'],
        max: [120, 'La edad Maxima es 120']
        
    },
    Email: {
        type:String,
        require: [true, 'Se requiere un correo electronico']
    } 

});