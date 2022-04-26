const { Schema, model } = require('mongoose');

const ubicaciones = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = model('ubicaciones', ubicaciones);