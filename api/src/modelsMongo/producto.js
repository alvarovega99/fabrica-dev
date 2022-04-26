const { Schema, model } = require('mongoose');

const productos = new Schema({
    name: {
        type: String,
        required: true,
    },
    mesesVencimiento: {
        type: Number,
    }
});

module.exports = model('productos', productos);