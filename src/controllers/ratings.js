import { Avaliacoes, Colaboradores, sequelize } from "../models/index"
import { QueryTypes } from "sequelize"

const index = async (req, res) => {
    try {
        const avaliacoes = await sequelize.query('select  C.nome,A.* from Avaliacoes A '+
        ' left join Colaboradores C on C.id = A.id_autor ', {type : QueryTypes.SELECT});
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
        const avaliacao = await sequelize.query('select  C.nome,A.* from Avaliacoes A '+
        ' left join Colaboradores C on C.id = A.id_autor '+
        ` where A.id = ${id}`, {type : QueryTypes.SELECT});

        if (avaliacao !== null) res.send(avaliacao)
        else res.status(202).json({msg: "Avaliação não encontrada!"})
    } catch (error) {
        res.status(500).json(error)
    }
}
const readByMetrics = async (req, res) => {
    try {
        const { id } = req.params
        const avaliacao = await sequelize.query('select  C.nome,A.* from Avaliacoes A '+
        ' left join Colaboradores C on C.id = A.id_autor '+
        ` where A.id_indicacao = ${id}`, {type : QueryTypes.SELECT});

        if (avaliacao !== null) res.send(avaliacao)
        else res.status(202).json({msg: "Avaliação não encontrada!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const found = await Avaliacoes.update(req.body, {where: {id: id}})
        if(found[0] === 1) res.send({msg: "Avaliação atualizada!"})
        else res.status(202).json({msg: "Avaliação não encontrada!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Avaliacoes.destroy({where: {id: id}})
        if(deleted === 1) res.send({msg: "Avaliação deletada!"})
        else res.status(202).json({msg: "Avaliação não encontrada!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export default { index, create, read, update, remove,readByMetrics}