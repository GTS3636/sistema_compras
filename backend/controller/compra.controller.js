const Compra = require('../model/Compra.js');
const cadastrar = async (req, res) => {
    const dados = req.body
    try {
        const resp = await Compra.create(dados)
        if (resp) {
            res.status(201).json(resp)
            console.log('Compra cadastrada com sucesso usando os seguintes dados: ', resp)
        } else {
            res.status(400).json({ message: 'Erro ao cadastrar compra!' })
            console.log('Erro ao cadastrar compra!')
        }
    } catch (err) {
        console.error("Erro interno do servidor ao cadastrar a compra:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao cadastrar a compra.' })
    }
}
const listar = async (req, res) => {
    try {
        const resp = await Compra.findAll()
        res.status(200).json(resp)
        console.log('Compras encontradas: ', resp)
    } catch (err) {
        console.error("Erro interno do servidor ao listar as compras:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao listar as compras.' })
    }
}
const atualizar = async (req, res) => {
    const id = req.params.id
    const dados = req.body
    try {
        const resp = await Compra.findByPk(id)
        if (resp) {
            await Compra.update(dados, { where: { id: id } })
            res.status(200).json({ message: 'Compra atualizada com sucesso!' }, dados)
            console.log('Compra atualizada com sucesso usando os seguintes dados: ', dados)
        } else {
            res.status(404).json({ message: 'Compra não encontrada!' })
            console.log('Compra não encontrada!')
        }
    } catch (err) {
        console.error("Erro interno do servidor ao atualizar a compra:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar a compra.' })
    }
}
const deletar = async (req, res) => {
    const id = req.params.id
    try {
        const resp = Compra.findByPk(id)
        if (resp) {
            await Compra.destroy({ where: { id: id } })
            res.status(200).json({ message: `Compra com o id ${id} deletada com sucesso!` })
            console.log(`Compra com o id ${id} deletada com sucesso!`)
        } else {
            res.status(404).json({ message: `Compra com o id ${id} não encontrada!` })
            console.log(`Compra com o id ${id} deletada com sucesso!`)
        }
    } catch (err) {
        console.error("Erro interno do servidor ao deletar a compra:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao deletar a compra.' })
    }
}
module.exports = { cadastrar, atualizar, deletar, listar }