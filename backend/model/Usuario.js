const {DataTypes} = require("sequelize")
const db = require("../db/conn")
const Usuario = db.define("usuario",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    primeiroNome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    segundoNome:{
        type: DataTypes.STRING,
        allowNull: true
    },
    idade:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    telfone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade:{
        type: DataTypes.STRING,
        allowNull: false
    },
    estado:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dataNascimento:{
        type: DataTypes.DATE,
        allowNull: false
    }
},{tableName:"usuarios",timestamps: false})
module.exports = Usuario