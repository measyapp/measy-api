import { Avaliacoes, Colaboradores } from "../models/index"


const index = async (req, res) => {
    try {
        const avaliacoes = await Avaliacoes.findAll({
            include: [{
                model: Colaboradores,
                attributes:['nome']
            }]
        })
        res.send(avaliacoes)
    } catch (error) {
        res.status(500).json(error)
    }
}

const create = async (req, res) => {
    try {
        const avaliacao = await Avaliacoes.create({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        res.send(avaliacao)
    } catch (error) {
        res.status(500).json(error)
    }
}

const read = async (req, res) => {
    try {
        const { id } = req.params
        const avaliacao = await Avaliacoes.findByPk(id, {
            include: [{
                model: Colaboradores,
                attributes:['nome']
            }]
        })
        if (avaliacao !== null) res.send(avaliacao)
        else res.status(404).json({msg: "Avaliação não encontrada!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const found = await Avaliacoes.update(req.body, {where: {id: id}})
        if(found[0] === 1) res.send({msg: "Avaliação atualizada!"})
        else res.status(404).json({msg: "Avaliação não encontrada!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Avaliacoes.destroy({where: {id: id}})
        if(deleted === 1) res.send({msg: "Avaliação deletada!"})
        else res.status(404).json({msg: "Avaliação não encontrada!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export default { index, create, read, update, remove }