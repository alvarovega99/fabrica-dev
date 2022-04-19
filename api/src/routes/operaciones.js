const e = require('express');
const express = require('express');
const router = express.Router();
const { Operaciones } = require('../db')

const { Usuarios, Productos } = require('../db')

//trae toda las operaciones con el usuario que la creo
router.get('/', async (req, res) => {
    try {
        const operaciones = await Operaciones.findAll({
            include: [{
                model: Usuarios
            }]
        });
        if (operaciones.length > 0) {
            res.json(operaciones);
        } else {
            res.status(404).json({
                message: 'No hay operaciones'
            });
        }
        res.status(200).send(operaciones);
    }catch (err) {
        res.send(err.message);
    }
})
//bucar por codigo de carga
router.get('/:codigoCarga', async (req, res) => {
    try {
        const { codigoCarga } = req.params
        const operacion = await Operaciones.findOne(
            {
                where: {
                    codigoCarga: codigoCarga,
                    status: 'disponible'
                }
            }
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
})
/////////////TOTAL DE POLVO
router.get('/polvo/total', async (req, res) => {
    
    try {
        
        const operacion = await Operaciones.findAll(
            {
                where: {
                    tipoIngreso: 'polvo',
                    status: 'disponible'
                }
            }
        );

        console.log(operacion);
        let total = 0;

        operacion.map(e => {total += e.cantidad})
        console.log(total)
        const enviar = {
            total: total
        }


        res.status(200).send(enviar);
    }catch (err) {
        res.send(err.message);
    }
})
//cantida de polvo de una galleta id
router.get('/polvo/id/:galleta', async (req, res) => {
    const id = req.params.galleta

    try {
        
        const operacion = await Operaciones.findAll(
            {
                where: {
                    tipoIngreso: 'polvo',
                    status: 'disponible',
                    idProducto: id
                }
            }
        );

        console.log(operacion);
        let total = 0;

        operacion.map(e => {total += e.cantidad})
        console.log(total)
        const enviar = {
            idGalleta: id,
            total: total
        }


        res.status(200).send(enviar);
    }catch (err) {
        res.send(err.message);
    }
})

//cantidad de galleta de un id
router.get('/galleta/id/:galleta', async (req, res) => {
    const id = req.params.galleta
    try {
        
        const operacion = await Operaciones.findAll(
            {
                where: {
                    tipoIngreso: 'galleta',
                    status: 'disponible',
                    idProducto: id
                }
            }
        );

        console.log(operacion);
        let total = 0;

        operacion.map(e => {total += e.cantidad})
        console.log(total)
        const enviar = {
            idGalleta: id,
            total: total
        }


        res.status(200).send(enviar);
    }catch (err) {
        res.send(err.message);
    }
})

////TOTAL GALLETA DISPONIBLE

router.get('/galleta/total', async (req, res) => {

    try {
        
        const operacion = await Operaciones.findAll(
            {
                where: {
                    tipoIngreso: 'galleta',
                    status: 'disponible'
                }
            }
        );

        console.log(operacion);
        let total = 0;

        operacion.map(e => {total += e.cantidad})
        console.log(total)
        const enviar = {
            total: total
        }


        res.status(200).send(enviar);
    }catch (err) {
        res.send(err.message);
    }
})
/* function vencimiento(meses, fecha){
   const a = fecha.setMonth(fecha.getMonth() + 3);

    return a;
} */

//crear operacion
router.post('/', async (req, res) => {
    
    try {
        
        const {idUsuario, tipoIngreso, tipoOperacion, idProducto, cantidad, ubicacion, codigoCarga } = req.body;
        var e = new Date()
        const usuario = await Usuarios.findByPk(idUsuario);
        const producto = await Productos.findByPk(idProducto);
        //fecha actual + 3 meses
        const fecha = new Date(e.setMonth(e.getMonth() + producto.mesesVencimiento));
        console.log(fecha.toLocaleDateString());

        const operacion = await Operaciones.create({
            codigoCarga: codigoCarga,
            tipoIngreso: tipoIngreso,
            tipoOperacion: tipoOperacion,
            idProducto: parseInt(idProducto, 10),
            cantidad: cantidad,
            status: 'disponible',
            ubicacion: parseInt(ubicacion, 10),
            vencimiento: fecha.toLocaleDateString(),
           
        })
        //vincular operacion con usuario
        await usuario.addOperaciones(operacion);        
        res.status(200).json({
            message: 'confirmado',
        });
    }catch (err) {
        res.send(err.message);
    }
})

router.post('/status', async (req, res) => {
    try {
        const { id , status, idUsuario } = req.body;
        const operacion = await Operaciones.findOne({
            where: {
                codigoCarga: id
            }
        });
        const usuario = await Usuarios.findByPk(idUsuario);
        const operacioncre = await Operaciones.create({
            codigoCarga: operacion.codigoCarga,
            tipoIngreso: operacion.tipoIngreso,
            tipoOperacion: status,
            idProducto: parseInt(operacion.idProducto, 10),
            cantidad: operacion.cantidad,
            status: status,
            ubicacion: parseInt(operacion.ubicacion, 10),
            vencimiento: operacion.vencimiento,
           
        })
        await usuario.addOperaciones(operacioncre);
        await operacion.update({
            status: status
        })
        res.status(200).json({
            message: 'confirmado',
        });
    }catch (err) {
        res.send(err.message);
    }
}
)

router.post('/delete', async (req, res) => {
    const array = req.body.array;
    try {
        array.forEach(async (id) => {
            await Productos.destroy({
                where: {
                    codigoCarga: id
                }
            })
        }
        )
        res.status(200).json({
            message: 'confirmado',
        });
    } catch (err) {
        res.send(err.message)
    }
})

module.exports = router;