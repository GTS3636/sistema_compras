const {DataTypes} = require("sequelize")
const db = require("../db/conn")
const Compra = db.define("compra",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'usuario', // Nome da tabela referenciada
            key: 'id' // Chave primária da tabela referenciada
        }
    },
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'produto',
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataCompra: {
        type: DataTypes.DATE,
        allowNull: false
    },
    precoUnitario:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    formaPagamento:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pendente' // Pendente, Concluída, Cancelada
    }
}, {tableName: "compra", timestamps: false})
module.exports = Compra