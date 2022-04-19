const express = require('express');
const router = express.Router();
const { Usuarios, Operaciones } = require('../db')
const {v4: uuidv4} = require('uuid');
const usuarios = require('../models/Usuarios');
const bcrypt = require("bcryptjs")
router.get('/', async (req, res) => {
    try {
        const users = await Usuarios.findAll({
            include: Operaciones
        });
        res.status(200).send(users);
    }catch (err) {
        res.send(err.message);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const users = await Usuarios.findOne({
            where: {
              idUsuario: id
            },

            include: Operaciones
        });
        res.status(200).send(users);
    }catch (err) {
        res.send(err.message);
    }
})


router.post('/', async (req, res) => {
    try {
        const { nombre, apellido, legajo, password, tipo} = req.body;
        const rondasHash = 12;
        const user = await Usuarios.create({
            nombre: nombre,
            apellido: apellido,
            legajo: legajo,
            password: await bcrypt.hash(password, rondasHash),
            tipo: tipo
        })
        res.status(200).json({
            message: 'corfirmado',
        });
    }catch (err) {
        res.send(err.message);
    }
})
router.post("/loginUser", async (req, res) => {

    const { legajo, password } = req.body

    try {
               
            const user = await Usuarios.findOne({ where: { legajo: legajo }, })
            if (user === null) {
                res.status(400).json({
                    message: "Usuario no encontrado"
                })
            } else {
                const passwordValidated = await bcrypt.compare(password, user.password)
                if(passwordValidated === true) res.status(200).json({
                    message: "confirmado",
                    user: {
                        id: user.idUsuario,
                        nombre: user.nombre,
                        apellido: user.apellido,
                        legajo: user.legajo,
                        tipo: user.tipo 
                    }
                })
                else res.status(400).json({
                    message: "Contraseña incorrecta"

                })
            }
        
    }
    catch (error) {
        res.send("Ups...!!!existe un error")
    }
})

module.exports = router;