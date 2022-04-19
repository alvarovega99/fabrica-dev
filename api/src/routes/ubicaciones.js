const express = require('express');
const router = express.Router();
const { Ubicaciones } = require('../db')
const {v4: uuidv4} = require('uuid');

router.get('/', async (req, res) => {
    try {
        const ubicaciones = await Ubicaciones.findAll();
        if (ubicaciones.length > 0) {
            res.json(ubicaciones);
        } else {
            res.status(404).json({});
        }
    }catch (err) {
        res.send(err.message);
    }
})


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ubicaciones = await Ubicaciones.findByPk(id);
        res.status(200).send(ubicaciones);
    }catch (err) {
        res.send(err.message);
    }
})

router.post('/', async (req, res) => {
    try{
        const { nombre } = req.body;
        const ubicacion = await Ubicaciones.create({
            name: nombre,
        })
        res.status(200).json({
            message: 'confirmado',
        });
    }catch (err) {
        res.send(err.message)

    }
})

//eliminar un array de ubicaciones
router.post('/delete', async (req, res) => {
    const array = req.body.array;
    try {
        array.forEach(async (id) => {
            await Ubicaciones.destroy({
                where: {
                    id: id
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