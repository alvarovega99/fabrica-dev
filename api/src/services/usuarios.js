const Usuario  = require('../modelsMongo/usuarios');

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
        password: usuario.password,
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