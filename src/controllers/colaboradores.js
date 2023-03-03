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
      const { email, senha } = req.body;
  
      // Verifica se o e-mail já está cadastrado
      const existingColaborador = await Colaboradores.findOne({ where: { email } });
  
      if (existingColaborador) {
        res.status(400).send({ msg: "E-mail já cadastrado" });
        return;
      }
  
      // Cria o colaborador
      const hashedPassword = await bcrypt.hash(senha, parseInt(process.env.BCRYPT_ROUNDS));
      
      await Colaboradores.create({ ...req.body, senha: hashedPassword });
      res.status(201).send({ msg: "Usuário Criado" });
    } catch (error) {
      res.status(500).send(error);
    }
  };
const read = async(req, res) => {
    try {
        const { id } = req.params;
        const colaborador = await Colaboradores.findByPk(id);
        if(colaborador !== null) {
            res.send(colaborador);
        }
        else {
            res.status(202).json({msg: "Colaborador não encontrado"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const {senha} = req.body;
        const hashedPassword = await bcrypt.hash(senha, parseInt(process.env.BCRYPT_ROUNDS));
        //console.log(req.body)
        const [colaborador] = await Colaboradores.update({...req.body, senha: hashedPassword}, {where: {id:id}});
        if (colaborador) res.status(204).send();
        else res.status(202).json({msg: "Colaborador não encontrado"});
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
        else res.status(202).json({msg: "Colaborador não encontrado"});
    } catch (error) {
        res.status(500).json(error);
    }
}

export default { index, create, read, update, remove }