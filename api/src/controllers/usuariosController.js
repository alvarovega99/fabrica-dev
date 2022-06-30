const {createUsuario, getOneUsuario, findAllUsuarios, deleteUsuario} = require('../services/usuarios');

async function createUsuarioController(req, res) {
    try{
    const { nombre, apellido, legajo, password, tipo} = req.body;
    const usuario = await createUsuario(nombre, apellido, legajo, password, tipo);
    res.status(201).json({
        message: 'Usuario creado',
        usuario
    });
    }catch(error){
        res.status(500).json({
            message: 'Error al crear usuario',
            error
        });
    }
}

async function getOneUsuarioController(req, res) {
    try{
    const { id } = req.params;
    const usuario = await getOneUsuario(id);
    if(usuario === null) {
        res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }
    res.status(200).json({
        usuario
    });
    }catch(error){
        res.status(500).json({
            message: 'Error al buscar usuario',
            error
        });
    }
}

async function findAllUsuariosController(req, res) {
    try{
    const usuarios = await findAllUsuarios();
    if(usuarios.length === 0) {
        res.status(404).json({
            usuarios: []
        });
    }
    res.status(200).json({
        usuarios
    });
    }catch(error){
        res.json({
            message:'error',
            error: error.message
        });
    }
}

async function loginUserController(req, res) {
    try{
    const { legajo, password } = req.body;
    const usuario = await getOneUsuario(legajo);
    if(usuario === null) {
        res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }
    const passwordValidated = await bcrypt.compare(password, usuario.password);
    if(passwordValidated === true) res.status(200).json({
        message: 'Confirmado',
        usuario: {
            id: usuario.idUsuario,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            legajo: usuario.legajo,
            tipo: usuario.tipo 
        }
    });
    else res.status(400).json({
        message: 'Contraseña incorrecta'
    });
    }catch(error){
        res.status(500).json({
            message: 'Error al buscar usuario',
            error
        });
    }
}

module.exports = {
    createUsuarioController,
    getOneUsuarioController,
    findAllUsuariosController,
    loginUserController
}
