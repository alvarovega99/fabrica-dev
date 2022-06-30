const {findAllProductos, getOneProducto, createProducto, deleteProducto} = require('../services/productos');

async function getAllProductos(req, res){
    try{
        const productos = await findAllProductos();
        if(productos.length > 0){
            res.json(productos);
        }else{
            res.status(404).json({
                message: 'No hay productos'
            });
        }
    }catch (err) {
        res.json({
            message: 'error',
            error: err.message
        })
    }
}
async function createProducto(req, res){
    const {name, mesesVencimiento} = req.body;
    try{
        await createProducto({name, mesesVencimiento});
        res.json({
            message: 'Producto creado',
        });
    }catch (err) {
        res.json({
            message: 'error',
            error: err.message
        })
    }
}

async function deleteProducto(req, res){
    const array = req.body.array
    try {
        for (let i = 0; i < array.length; i++) {
            await deleteProducto({_id : array[i]});
        }
        res.status(200).json({
            message: 'confirmado',
        });
    } catch (err) {
        res.json({
            message: 'error',
            error: err.message
        })
    }
}

module.exports = {
    getAllProductos,
    createProducto,
    deleteProducto
}