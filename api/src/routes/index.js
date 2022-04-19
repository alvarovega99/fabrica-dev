const { Router } = require('express');
const usuarios = require('./usuarios')
const operaciones = require('./operaciones')
const productos = require('./productos')
const ubicaciones = require('./ubicaciones')
const router = Router();

router.use('/usuarios', usuarios);
router.use('/operaciones', operaciones);
router.use('/productos', productos);
router.use('/ubicaciones', ubicaciones);

module.exports = router;