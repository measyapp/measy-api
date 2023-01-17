import { v4 as uuid4 } from "uuid"
import {Colaboradores} from "../models/index"
import bcrypt, { hash } from "bcrypt"


const index = async (req, res) => {
    try{
        const colaboradores = await Colaboradores.findAll();//Add include quando houve relacionamento
        res.send(colaboradores);
    }catch(error){
        res.status(500).json({message: "Error"});
    }
}
//action para administrador do sistema
const create = async (req, res) => {
    try {
        bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS), (err, salt) =>{
            bcrypt.hash(req.body.senha, salt, async (err,hash)=>{
                await Colaboradores.create({...req.body, senha: hash});
                res.send({msg: "Usuário Criado"});
            });
        })
    } catch (error) {
        res.status(500).send(error);
    }
}
const read = async(req, res) => {
    try {
        const { id } = req.params;
        const colaborador = await Colaboradores.findByPk(id);
        if(colaborador !== null) {
            res.send(colaborador);
        }
        else {
            res.status(404).json({msg: "Colaborador não encontrado"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const [colaborador] = await Colaboradores.update(req.body, {where: {id:id}});
        if (colaborador) res.send({msg: "Colaborador Atualizado!"});
        else res.status(404).json({msg: "Colaborador não encontrado"});
    } catch (error) {
        res.status(500).json(error);
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const colaborador = await Colaboradores.destroy({where: {id:id}});
        if (colaborador) {
            res.send({msg: "Colaborador Apagado!"});
        }
        else res.status(404).json({msg: "Colaborador não encontrado"});
    } catch (error) {
        res.status(500).json(error);
    }
}

export default { index, create, read, update, remove }