const express = require('express');
const router = express.Router();
const { Productos } = require('../db')
const {v4: uuidv4} = require('uuid');

router.get('/', async (req, res) => {
    try {
        const productos = await Productos.findAll();
        if (productos.length > 0) {
            res.json(productos);
        } else {
            res.status(404).json({});
        }
    }catch (err) {
        res.send(err.message);
    }
})

router.post('/delete', async (req, res) => {
    
    const array = req.body.array
    try {
        array.forEach(async (id) => {
            await Productos.destroy({
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
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productos = await Productos.findByPk(id);
        res.status(200).send(productos);
    }catch (err) {
        res.send(err.message);
    }
})

router.post('/', async (req, res) => {
    try{
        const { nombre, mesesVencimiento } = req.body;
        const producto = await Productos.create({
            name: nombre,
            mesesVencimiento: mesesVencimiento
            
        })
        res.status(200).json({
            message: 'confirmado',
        });
    }catch (err) {
        res.send(err.message)

    }
})

module.exports = router;