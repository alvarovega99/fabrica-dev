const Ubicacion  = require('../modelsMongo/ubicaciones');

function findAllUbicaciones (){
    return Ubicacion.find();
}

function getOneUbicacion(filtro){
    return Ubicacion.findOne(filtro);
}

async function createUbicacion(ubicacion){
    const op = Ubicacion.create({
        name: ubicacion.name,
    })
    return await op.save();
}

async function deleteUbicacion(filtro){
    return await Ubicacion.destroy(filtro);
}

module.exports = {
    findAllUbicaciones,
    getOneUbicacion,
    createUbicacion,
    deleteUbicacion
}