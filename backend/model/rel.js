const Compra = require('./Compra.js')
const Produto = require('./Produto.js')
const Usuario = require('./Usuario.js')

Compra.hasMany(Produto,{
    foreignKey: 'compraId',
    as: 'produtosCompra',
    onDelete: 'CASCADE'
})

Produto.belongsTo(Compra,{
    foreignKey: 'compraId',
    as: 'compraProduto',
    onDelete: 'CASCADE'
})

Compra.hasOne(Usuario,{
    foreignKey: 'usuarioId',
    as: 'usuarioCompra',
    onDelete: 'CASCADE'
})

Usuario.belongsTo(Compra,{
    foreignKey: 'usuarioId',
    as: 'compraUsuario',
    onDelete: 'CASCADE'
})