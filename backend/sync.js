const conn = require('./db/conn')
const { Usuario, Produto, Compra } = require('./model/rel.js')
async function syncDatabase() {
    try {
        await conn.sync({ force: true }) 
        console.log('Database synchronized successfully.')
    } catch (error) {
        console.error('Error synchronizing database:', error)
    } finally {
        await conn.close()
        console.log('Database connection closed.')
    }
}
syncDatabase()