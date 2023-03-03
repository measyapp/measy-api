
import { Projetos, sequelize } from "../models/index"
import { QueryTypes } from "sequelize"

const index = async (req, res) => {
    try {
        const projetos = await Projetos.findAll()
        res.send(projetos)
    } catch (error) {
        res.status(500).json(error)
    }
}

const create = async (req, res) => {
    try {
        const projeto = await Projetos.create({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        res.send(projeto)
    } catch (error) {
        res.status(500).json(error)
    }
}

const read = async (req, res) => {
    try {
        const { id } = req.params
        const projeto = await Projetos.findByPk(id)
        if (projeto !== null) res.send(projeto)
        else res.status(404).json({msg: "Projeto não encontrado!"})
    } catch (error) {
        res.status(500).json(error)
    }
}
const readByUser = async (req, res) => {
    try {
        const { id } = req.params
        const projeto = await sequelize.query('select P.* from Projetos P '+
        `where P.id_criador = ${id}`, {type: QueryTypes.SELECT});
        //console.log(projeto);
        if ((projeto !== null)&&(projeto!==undefined)) res.status(200).send(projeto)
        else res.status(404).json({msg: "Projeto não encontrado!"})
    } catch (error) {
        res.status(500).json(error)
    }
}


const update = async (req, res) => {
    try {
        const { id } = req.params
        const found = await Projetos.update(req.body, {where: {id: id}})
        if(found[0] === 1) res.send({msg: "Projeto atualizado!"})
        else res.status(404).json({msg: "Projeto não encontrado!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Projetos.destroy({where: {id: id}})
        if(deleted === 1) res.send({msg: "Projeto deletado!"})
        else res.status(404).json({msg: "Projeto não encontrado!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export default { index, create, read, update, remove,readByUser }