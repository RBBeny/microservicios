var express = require('express');

var ruta = express.Router();

var mongoose = require('mongoose');
require('../models/modelCurso');
const curso = mongoose.model('Curso');

//Meotodo GET 
/*
ruta.get('/', (req, res)=>{
    res.send('Metodo que lista Cursos');
});
*/


ruta.get('/:cursono', (req, res)=>{

    let CursoNo=req.params.cursono;
    curso.find({CursoNo}).then((curso)=>{
        res.json(curso);
    }).catch((error) => {
        if(error)
            throw error; 
    });
});

ruta.get('/', (req, res)=>{
    curso.find().then((cursos)=>{
        res.json(cursos);
    }).catch((error)=>{
        if(error)
            throw error;
    });

});

//Metodo POST agrega curso
/*
ruta.post('/',(req, res)=>{
    //res.send('Agregando un registro de curso');
    res.json(req.body);
    console.log(req.body);

});
*/


//Modifica registro PUT
/*
ruta.put('/',(req, res)=>{
    res.send('Modificando registro de un curso');
});
*/

//Elimina registro PUT
/*
ruta.delete('/:cursono',(req, res)=>{
    res.send('Eliminando un registro de un curso');
});
*/

ruta.delete('/:cursono', (req, res) => {
    cursono= req.params.cursono;
    curso.findOneAndRemove({CursoNo: cursono }).then(() => {
        res.send("El curso se elimino");
    }).catch((error) => {
        if (error)
            throw error;
    });
});

ruta.post('/',(req, res)=>{

    console.log(req.body);
    var newCurso = {
        CursoNo: req.body.CursoNo,
        Cuatrimestre: req.body.Cuatrimestre,
        FechaInicio: req.body.FechaInicio,
        FechaFin: req.body.FechaFin,
        Nombre: req.body.Nombre,
        Descripcion: req.body.Descripcion
        
    }
    var cur = new curso(newCurso);

    cur.save().then(() => {
        console.log("Un curso fue agregado!!");
        res.send('Un nuevo curso agregado correctamente');
    }).catch((error)=> {
        if(error){
            console.log("Un error al agregar el curso");
            throw error;
        }
    });
});

ruta.put('/', (req, res) => {
    curso.findOne({CursoNo: req.body.CursoNo}).then((curso) => {

        console.log(req.body);
        curso.markModified('Cuatrimestre');
        curso.markModified('Nombre');

        curso.save().then(() => {
            res.send("Curso Modificado");
        }).catch((error) => {
            if (error)
                throw error;
        });
    }).catch((error) => {
        if (error)
            throw error;
    });
});

module.exports = ruta;