const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('usuarios', {
        idUsuario: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        }, 
        nombre: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        legajo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        tipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        timestamps: false
    })
};
