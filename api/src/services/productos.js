const Producto  = require('../modelsMongo/producto');

function findAllProductos (){
    return Producto.find();
}

function getOneProducto(filtro){
    return Producto.findOne(filtro);
}

async function createProducto(operacion){
    const op = Producto.create({
        name: operacion.name,
        mesesVencimiento: operacion.mesesVencimiento,
    })
    return await op.save();
}

async function deleteProducto(filtro){
    return await Producto.destroy(filtro);
}

module.exports = {
    findAllProductos,
    getOneProducto,
    createProducto,
    deleteProducto
}