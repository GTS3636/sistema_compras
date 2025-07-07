const express = require('express')
const app = express()

require('dotenv').config()

const cors = require('cors')
const PORT = 3000
const hostname = 'localhost'

const compraController = require('./controller/compra.controller.js')
const usuarioController = require('./controller/usuario.controller.js')
const produtoController = require('./controller/produto.controlelr.js')

app.post("/compra", compraController.cadastrar)
app.get("/compra", compraController.listar)
app.put("/compra/:id", compraController.atualizar)
app.delete("/compra/:id", compraController.deletar)
app.get("/compra/:id", compraController.consultar)

app.post("/usuario", usuarioController.cadastrar)
app.get("/usuario", usuarioController.listar)
app.put("/usuario/:id", usuarioController.atualizar)
app.delete("/usuario/:id", usuarioController.deletar)
app.get("/usuario/:id", usuarioController.consultar)

app.post("/produto", produtoController.cadastrar)
app.get("/produto", produtoController.listar)
app.put("/produto/:id", produtoController.atualizar)
app.delete("/produto/:id", produtoController.deletar)
app.get("/produto/:id", produtoController.consultar)

const conn = require('./db/conn')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())



conn.sync()
.then(()=>{
    app.listen(PORT,hostname, ()=>{
        console.log(`Servidor rodando em ${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Não foi possível conectar com o banco de dados!',err)
})