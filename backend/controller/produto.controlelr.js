const Produto = require("../model/Produto.js")
const cadastrar = async (req, res) => {
    const dados = req.body
    try {
        const resp = await Produto.create(dados);
        if (resp) {
            res.status(201).json(resp)
            console.log('Produto cadastrado com sucesso usando os seguintes dados: ', resp)
        } else {
            res.status(400).json({ message: 'Erro ao cadastrar produto!' })
            console.log('Erro ao cadastrar produto!')
        }
    } catch (err) {
        console.error("Erro interno do servidor ao cadastrar o produto:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao cadastrar o produto.' })
    }
}
const listar = async (req, res) => {
    try {
        const resp = await Produto.findAll()
        res.status(200).json(resp)
        console.log('Produtos encontrados: ', resp)
    } catch (err) {
        console.error("Erro interno do servidor ao listar os produtos:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao listar os produtos.' })
    }
}
const atualizar = async (req, res) => {
    const id = req.params.id
    const dados = req.body
    try {
        const resp = await Produto.findByPk(id)
        if (resp) {
            await Produto.update(dados, { where: { id: id } })
            res.status(200).json(dados)
            console.log('Produto atualizado com sucesso usando os seguintes dados: ', dados)
        } else {
            res.status(404).json({ message: 'Produto não encontrado!' })
            console.log('Produto não encontrado!')
        }
    } catch (err) {
        console.error("Erro interno do servidor ao atualizar o produto:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar o produto.' })
    }
}
const deletar = async (req, res) => {
    const id = req.params.id
    try {
        const resp = await Produto.findByPk(id)
        if (resp) {
            await Produto.destroy({ where: { id: id } })
            res.status(200).json({ message: `Produto com o id ${id} deletado com sucesso!` })
            console.log(`Produto com o id ${id} deletado com sucesso!`)
        } else {
            res.status(404).json({ message: `Produto com o id ${id} não encontrado!` })
            console.log(`Produto com o id ${id} não encontrado!`);
        }
    } catch (err) {
        console.error("Erro interno do servidor ao deletar o produto:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao deletar o produto.' })
    }
}
const consultar = async (req, res) => {
    const id = req.params.id
    try {
        const resp = await Produto.findByPk(id)
        if (resp) {
            res.status(200).json(resp)
            console.log('Produto encontrado: ', resp)
        } else {
            res.status(404).json({ message: 'Produto não encontrado!' })
            console.log('Produto não encontrado!')
        }
    } catch (err) {
        console.error("Erro interno do servidor ao consultar o produto:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao consultar o produto.' })
    }
}
const cadastrarLote = async (req, res) => {
    const dados = req.body
    try {
        const resp = await Produto.bulkCreate(dados)
        if (resp) {
            res.status(200).json(dados)
        } else {
            res.status(500).json({ message: "Não foi possível cadastrar os dados em lote" })
            console.error("Erro no cadastrar os dados em lote.")
        }
    } catch {
        console.error("Erro interno do servidor ao cadastrar em lote os usuários:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao cadastrar em lote os usuários.' })
    }
}
module.exports = { cadastrar, cadastrarLote, consultar, atualizar, deletar, listar }