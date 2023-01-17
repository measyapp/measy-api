import { v4 as uuid4 } from "uuid"
import {Colaboradores} from "../models/index"
import bcrypt, { hash } from "bcrypt"


//action para usuário
const signup = async (req, res) => {
    try {
        bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS), (err, salt) =>{
            bcrypt.hash(req.body.senha, salt, async (err,hash)=>{
                console.log(req.body);
                await Colaboradores.create({...req.body, senha: hash});
                res.send({msg: "Usuário Criado"});
            });
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

const login = async ( req, res) => {
    try {
        const colaboradores =  await Colaboradores.findOne({where: { email: req.body.email}})
        
        if(colaboradores){
            bcrypt.compare(req.body.senha, colaboradores.senha,(err, ok) => {
                if (ok){
                    req.session.userId = colaboradores.id;
                    console.log(colaboradores.id);
                    
                    res.status(200).send({msg: "Colaborador Logado"});
                }else{
                    res.status(406).send({msg: "Senha login não confere!"});
                }
            })

        }else{
            res.status(406).send({msg: "Email de login não Logado"});
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const logout = async ( req, res) => {
    req.session.destroy(()=>{
        res.send({msg: "Sessão do Colaborador encerrada"});
    })
}

export default { signup, login, logout }