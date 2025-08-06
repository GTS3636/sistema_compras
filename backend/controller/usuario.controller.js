const Usuario = require("../model/Usuario.js")
const cadastrar = async (req, res) => {
    const dados = req.body
    try {
        const resp = await Usuario.create(dados)
        if (resp) {
            res.status(201).json(resp)
            console.log('Usuário cadastrado com sucesso usando os seguintes dados: ', resp)
        } else {
            res.status(400).json({ message: 'Erro ao cadastrar usuário!' })
            console.log('Erro ao cadastrar usuário!')
        }
    } catch (err) {
        console.error("Erro interno do servidor ao cadastrar o usuário:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao cadastrar o usuário.' })
    }
}
const listar = async (req, res) => {
    try {
        const resp = await Usuario.findAll()
        res.status(200).json(resp)
        console.log('Usuários encontrados: ', resp)
    } catch (err) {
        console.error("Erro interno do servidor ao listar os usuários:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao listar os usuários.' })
    }
}
const atualizar = async (req, res) => {
    const id = req.params.id
    const dados = req.body
    try {
        const resp = await Usuario.findByPk(id)
        if (resp) {
            await Usuario.update(dados, { where: { id: id } })
            res.status(200).json(dados)
            console.log('Usuário atualizado com sucesso usando os seguintes dados: ', dados)
        } else {
            res.status(404).json({ message: 'Usuário não encontrado!' })
            console.log('Usuário não encontrado!')
        }
    } catch (err) {
        console.error("Erro interno do servidor ao atualizar o usuário:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar o usuário.' })
    }
}
const deletar = async (req, res) => {
    const id = req.params.id
    try {
        const resp = await Usuario.findByPk(id)
        if (resp) {
            await Usuario.destroy({ where: { id: id } })
            res.status(200).json({ message: `Usuário com o id ${id} deletado com sucesso!` })
            console.log(`Usuário com o id ${id} deletado com sucesso!`)
        } else {
            res.status(404).json({ message: `Usuário com o id ${id} não encontrado!` })
            console.log(`Usuário com o id ${id} não encontrado!`)
        }
    } catch (err) {
        console.error("Erro interno do servidor ao deletar o usuário:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao deletar o usuário.' })
    }
}
const consultar = async (req, res) => {
    const id = req.params.id
    try {
        const resp = await Usuario.findByPk(id)
        if (resp) {
            res.status(200).json(resp)
            console.log('Usuário encontrado: ', resp)
        } else {
            res.status(404).json({ message: 'Usuário não encontrado!' })
            console.log('Usuário não encontrado!')
        }
    } catch (err) {
        console.error("Erro interno do servidor ao consultar o usuário:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao consultar o usuário.' })
    }
}
const cadastrarLote = async (req, res) => {
    const data = req.body
    try {
        const resp = await Usuario.bulkCreate(data)
        if (resp) {
            res.status(200).json(resp)
        } else {
            res.status(500).json({ message: "Erro no cadastrar os dados em lote." })
            console.error("Erro no cadastrar os dados em lote.")
        }
    } catch {
        console.error("Erro interno do servidor ao cadastrar em lote os usuários:", err)
        res.status(500).json({ message: 'Erro interno do servidor ao cadastrar em lote os usuários.' })
    }
}
module.exports = { cadastrar, cadastrarLote, consultar, atualizar, deletar, listar }