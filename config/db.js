const mongoose = require("mongoose");



const MongoURI = "mongodb+srv://test:test@cluster0.ypvzk.mongodb.net/Microservicios?retryWrites=true&w=majority";

const MongoServer = async() => {
    try{
        await mongoose.connect(MongoURI,{
            useNewUrlParser: true
        });
        console.log("Conectado a la Base de Datos Mongo Atlas!!!")
    } catch(e){
        console.log(e);
        throw e;
    }

};


module.exports = MongoServer;


