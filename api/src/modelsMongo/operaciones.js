const { Schema, model } = require('mongoose');

const operaciones = new Schema({
    codigoCarga: {
        type: String,
        required: true,
    },    
    tipoIngreso: { 
        type: String,
        required: true,
    },
    tipoOperacion: {
        type: String,
        required: true,
    },
    idProducto: {
        type: Number,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    vencimiento: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    //relacionar usuario
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    }
});

module.exports = model('operaciones', operaciones);