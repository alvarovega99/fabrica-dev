const {createUbicacion, deleteUbicacion, findAllUbicaciones, getOneUbicacion} = require('../services/ubicaciones');

async function getOneUbicacion(req, res){
    const {id} = req.params;
    try{
        const ubicacion = await getOneUbicacion({_id: id});
        if(ubicacion){
            res.status(200).json({
                ubicacion
            })
        }
        else{
            res.status(404).json({
                message: 'No hay ubicaciones'
            });
        }
    }catch (err) {
        res.status(500).json({
            message:'error',
            error: err.message
        })
    }
}

async function getAllUbicaciones(req, res){
    try{
        const ubicaciones = await findAllUbicaciones();
        if(ubicaciones.length > 0){
            res.status(200).json({
                ubicaciones
            })
        }
        else{
            res.status(404).json({
                message: 'No hay ubicaciones'
            });
        }
    }catch (err) {
        res.status(500).json({
            message:'error',
            error: err.message
        })
    }
}

async function createUbicacion(req, res){
    const { nombre } = req.body;
    try{
        await createUbicacion({nombre});
        res.status(200).json({
            message: 'Ubicacion creada'
        })
    }catch (err) {
        res.status(500).json({
            message:'error',
            error: err.message
        })
    }

}

async function deleteUbicaciones(req, res){
    const arrayIds = req.body.ids;
    try{
        for(let i = 0; i < arrayIds.length; i++){
            await deleteUbicacion({_id: arrayIds[i]});
        }
        res.status(200).json({
            message: 'Ubicaciones eliminadas'
        })
    }
    catch (err) {
        res.status(500).json({
            message:'error',
            error: err.message
        })
    }
}

module.exports = {
    getOneUbicacion,
    getAllUbicaciones,
    createUbicacion,
}

