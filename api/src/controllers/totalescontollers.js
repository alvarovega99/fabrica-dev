const { findAllOperaciones, getOneOperacion, deleteOperacion, createOperacion } = require('../services/operaciones')


async function totalTipo(req,res){
    const { tipo } = req.params;
    try{
        const search = await findAllOperaciones({tipoIngreso: tipo, status:'disponible'})
        if(search === null){
            res.status(400).json({
                message:'Not found',
                total: 0
            })
        }else{
            const total = 0;
            search.map(e=>{
                total += e.cantidad;
            })
            res.status(200).json({
                total: total
            })
        }
    }catch(err){
        res.status(500).json({
            message:'error',
            error: err.message
        })
    }
}

async function totalProducto(req,res){
    const { tipo, idProducto } = req.body;
    try{
        const search = await findAllOperaciones({idProducto: idProducto, tipoIngreso: tipo , status: 'disponible'})
        if(search === null){
            res.status(400).json({
                message:'Not found',
                total: 0
            })
        }else{
            const total = 0;
            search.map(e=>{
                tota += e.cantidad;
            })
            res.status(200).json({
                total: total
            })
        }
    }catch(err){
        res.status(500).json({
            message:'error',
            error: err.message
        })
    }
}

module.exports = {
    totalProducto,
    totalTipo,
}