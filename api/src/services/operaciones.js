const Operaciones  = require('../modelsMongo/operaciones');

function findAllOperaciones (){
    return Operaciones.find();
}

function getOneOperacion(filtro){
    return Operaciones.findOne(filtro);
}

async function createOperacion(operacion){
    const op = Operaciones.create({
        codigoCarga: operacion.codigoCarga,
        tipoIngreso: operacion.tipoIngreso,
        tipoOperacion: operacion.tipoOperacion,
        idProducto: operacion.idProducto,
        cantidad: operacion.cantidad,
        status: operacion.status,
        ubicacion: operacion.ubicacion,
        vencimiento: operacion.vencimiento,
    })
    return await op.save();
}

async function deleteOperacion(filtro){
    return await Operaciones.destroy(filtro);
}

module.exports = {
    findAllOperaciones,
    getOneOperacion,
    createOperacion,
    deleteOperacion
}