const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('productos', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }, 
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mesesVencimiento: {
            type: DataTypes.INTEGER,
        }
    },
    {
        timestamps: false
    })
};
