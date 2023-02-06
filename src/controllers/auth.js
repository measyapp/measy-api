import { v4 as uuid4 } from "uuid"
import {Colaboradores} from "../models/index"
import bcrypt, { hash } from "bcrypt"
const jwt = require('jsonwebtoken');
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

const login = async (req, res) => {
    try {
        const colaboradores =  await Colaboradores.findOne({where: {email: req.body.email}})
        
        if(colaboradores) {
            bcrypt.compare(req.body.senha, colaboradores.senha, (err, ok) => {
                if(ok) {
                    const webtoken = jwt.sign({...colaboradores},process.env.SECRET,{expiresIn: req.body.d30===true?'30d':'2h'})
                    console.log('expiresIn:'+req.body.d30)
                    res.status(200).send({msg: "Colaborador logado!", token: webtoken});
                } else {
                    res.status(401).send({msg: "Senha login não confere!"});
                }
            })

        } else {
            res.status(401).send({msg: "Email ou senha incorretos!"});
        }
    } catch(error) {
        res.status(500).send(error.message)
    }
}

const logout = async (req, res) => {
   console.log('logout');
   res.status(200).send();
}


export default { signup, login, logout }