import { Metricas, sequelize } from "../models/index"
import { QueryTypes } from "sequelize"

const index = async (req, res) => {
    try {
        const metricas = await sequelize.query(' select coalesce(avg(A.nota),0) as nota,count(A.id) as avaliacoes, M.* '+
                                               ' from Metricas M '+
                                               ' left join Avaliacoes A on M.id = A.id_indicacao group by M.id', { type: QueryTypes.SELECT })
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
        console.log(id);
        const metrica =  await sequelize.query(' select coalesce(avg(A.nota),0) as nota, count(A.id) as avaliacoes, M.* '+
        ' from Metricas M '+
        ' left join Avaliacoes A on M.id = A.id_indicacao '+
        ` where M.id = ${id}`, { type: QueryTypes.SELECT })

        if (metrica !== null) res.send(metrica[0])
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