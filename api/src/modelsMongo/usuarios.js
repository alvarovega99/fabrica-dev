const { Schema, model } = require('mongoose');

const usuarios = new Schema({
    nombre: { 
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    legajo: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true

    },
    tipo: {
        type: Number,
        required: true
    },
});

module.exports = model('usuarios', usuarios);