const Usuario  = require('../modelsMongo/usuarios');
const bcrypt = require("bcryptjs")

function findAllUsuarios (){
    return Usuario.find();
}

function getOneUsuario(filtro){
    return Usuario.findOne(filtro);
}

async function createUsuario(usuario){
    const op = Usuario.create({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        legajo: usuario.legajo,
        password: await bcrypt.hash(password, rondasHash),
        tipo: usuario.tipo
    })
    return await op.save();
}

async function deleteUsuario(filtro){
    return await Usuario.destroy(filtro);
}

module.exports = {
    findAllUsuarios,
    getOneUsuario,
    createUsuario,
    deleteUsuario
}