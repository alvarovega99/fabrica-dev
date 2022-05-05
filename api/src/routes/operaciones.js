const e = require('express');
const express = require('express');
const router = express.Router();
const { Operaciones } = require('../db')

const { Usuarios, Productos } = require('../db')

//trae toda las operaciones con el usuario que la creo
router.get('/', async (req, res) => {

})
//bucar por codigo de carga
router.get('/:codigoCarga', )
/////////////TOTAL DE POLVO
router.get('/polvo/total', )
//cantida de polvo de una galleta id
router.get('/polvo/id/:galleta', )

//cantidad de galleta de un id
router.get('/galleta/id/:galleta',)

////TOTAL GALLETA DISPONIBLE

router.get('/galleta/total', )


router.post('/', )

router.post('/status',
)

router.post('/delete',)

module.exports = router;