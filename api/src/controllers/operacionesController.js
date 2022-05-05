const { findAllOperaciones, getOneOperacion, deleteOperacion, createOperacion, updateOperacion } = require('../services/operaciones')

async function getAllOperaciones(req,res){
    try{
        const operaciones = await findAllOperaciones().populate('usuarios', {'legajo' : 1});
        if(operaciones.length > 0){
            res.json(operaciones);
        }else{
            res.status(404).json({
                message: 'No hay operaciones'
            });
        }
    }catch (err) {
        res.send(err.message);
    }
}

async function getOperacionByCode(req, res){
    try{
        const { codigoCarga } = req.params
        const operacion = await getOneOperacion(
            {codigoCarga}
        );
        if (operacion) {
            res.json(operacion);
        } else {
            res.status(404).json({
                message: 'No hay operaciones'
            });
        }
    }catch (err) {
        res.send(err.message);
    }
}

async function deleteOperacion(req, res){
    try{
        const { codigoCarga } = req.params
        const operacion =  await getOneOperacion({codigoCarga})
        if(operacion){
            await deleteOperacion({codigoCarga})
            res.json({
                message: 'Operacion eliminada'
            })
        }else{
            res.status(404).json({
                message: 'No hay operaciones'
            });
        }
    }catch (err) {
        res.send(err.message);
    }
}

async function crearOperacion(req, res){
    try{
        const { codigoCarga, tipoIngreso, tipoOperacion, idProducto, cantidad, status, ubicacion, vencimiento } = req.body
        const operacion = await createOperacion({
            codigoCarga, tipoIngreso, tipoOperacion, idProducto, cantidad, status, ubicacion, vencimiento
        })
        if(operacion){
            res.json({
                message: 'Operacion creada'
            })
        }else{
            res.status(404).json({
                message: 'No se pudo crear la operacion'
            });
        }
    }catch (err) {
        res.send(err.message);
    }
}
async function sacarOperacion(req, res){
    const { status, codigoCarga }
    try{
        const search = await getOneOperacion({codigoCarga})
        if(search === null){
            res.status(400).json({
                message:'operacion no encontrada'
            })
        }else{
            const operacion = await createOperacion({
                codigoCarga:search.codigoCarga, 
                tipoIngreso:search.tipoIngreso, 
                tipoOperacion:search.tipoOperacion, 
                idProducto:search.idProducto, 
                cantidad:search.cantidad, 
                status: status, 
                ubicacion:search.ubicacion , 
                vencimiento:search.vencimiento
            })
            await updateOperacion({codigoCarga}, { status })
        }
    }
}
module.exports ={
    getAllOperaciones,
    getOperacionByCode,
    deleteOperacion,
    crearOperacion,

}