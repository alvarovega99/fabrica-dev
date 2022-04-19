const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('operaciones', {
        idOperacion: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        codigoCarga: {
            type: DataTypes.STRING,
            allowNull: false,
        },    
        tipoIngreso: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipoOperacion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idProducto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ubicacion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vencimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        timestamps: true
    })
};
