const {DataTypes} = require('sequelize')
const db = require('../db/conn')
const Produto = db.define('produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    categoria:{
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    percetualDesconto:{
        type: DataTypes.FLOAT,
        allowNull: true
    },
    estoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    marca:{
        type: DataTypes.STRING,
        allowNull: false
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {tableName: 'produto', timestamps: false})
module.exports = Produto