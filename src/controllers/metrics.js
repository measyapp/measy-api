import { Metricas } from "../models/index"


const index = async (req, res) => {
    try {
        const metricas = await Metricas.findAll()
        res.send(metricas)
    } catch (error) {
        res.status(500).json(error)
    }
}

const create = async (req, res) => {
    try {
        const metrica = await Metricas.create({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        res.send(metrica)
    } catch (error) {
        res.status(500).json(error)
    }
}

const read = async (req, res) => {
    try {
        const { id } = req.params
        const metrica = await Metricas.findByPk(id)
        if (metrica !== null) res.send(metrica)
        else res.status(404).json({msg: "Métrica não encontrada!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const found = await Metricas.update(req.body, {where: {id: id}})
        if(found[0] === 1) res.send({msg: "Métrica atualizada!"})
        else res.status(404).json({msg: "Métrica não encontrada!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Metricas.destroy({where: {id: id}})
        if(deleted === 1) res.send({msg: "Métrica deletada!"})
        else res.status(404).json({msg: "Métrica não encontrada!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export default { index, create, read, update, remove }