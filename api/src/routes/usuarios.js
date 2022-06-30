const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');
const bcrypt = require("bcryptjs")
router.get('/',)

router.get('/:id', )


router.post('/', )

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