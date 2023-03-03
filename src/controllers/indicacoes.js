import { Indicacoes, Metricas } from "../models/index"
import { spawn } from "child_process"
import { Op } from "sequelize"
 
const index = async (req, res) => {
    try {
        const indicacoes = await Indicacoes.findAll()
        res.send(indicacoes)
    } catch (error) {
        res.status(500).json(error)
    }
}

const create = async (req, res) => {
    try {
        const indicacao = await Indicacoes.create({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        res.send(indicacao)
    } catch (error) {
        res.status(500).json(error)
    }
}

const read = async (req, res) => {
    try {
        const { id } = req.params
        const indicacao = await Indicacoes.findByPk(id)
        if (indicacao !== null) res.send(indicacao)
        else res.status(404).json({msg: "Indicação não encontrada!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const found = await Indicacoes.update(req.body, {where: {id: id}})
        if(found[0] === 1) res.send({msg: "Indicação atualizada!"})
        else res.status(404).json({msg: "Indicação não encontrada!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Indicacoes.destroy({where: {id: id}})
        if(deleted === 1) res.send({msg: "Métrica deletada!"})
        else res.status(404).json({msg: "Métrica não encontrada!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

const indicateMetric = async (req, res) => {
    try {
        const resposta = req.body.resposta
        const child = spawn("python", ["src/indicacoes/grafo.py", resposta])
        child.stdout.on("data", async function (buffer) {
            const metricas = String(buffer).replaceAll('\"', '').split(",")
            const indic = await Metricas.findOne({
                where: {
                    nome: {
                        [Op.like]: '%' + metricas[0] + '%'
                    }
                }
            })
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

export default { index, create, read, update, remove, indicateMetric }