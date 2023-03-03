import { v4 as uuid4 } from "uuid"
import {Colaboradores} from "../models/index"
import bcrypt, { hash } from "bcrypt"
import e from "express";
import hashPassword from "../utils/generatePassword"

const jwt = require('jsonwebtoken');
//action para usuário
const getTokenResetPassword = async (req,res)=>{
    try{
        const {email} = req.params;
        const colaboradores =  await Colaboradores.findOne({where: { email: email}})
        console.log(email);
        if(colaboradores === null){
            //console.log("Usuário não encontrado");
            return res.status(204).send("Usuário não encontrado");
        }

        const webtoken = jwt.sign({userid: colaboradores.id},process.env.SECRET,{expiresIn: '1h'});
        res.status(200).send({token: webtoken});

    }catch(error){
        res.status(500).send(error);
        console.log(error);
    }
}
const resetPassword = async (req,res)=>{
    try{
        //Verifica a header que contém o token de autorização pra alteração de senha
        const token = req.headers['x-altpass-token'];
        //console.log(token);
        let user_Id = 0;

        if (!token) return res.status(404).json({ auth: false, message: 'No token provided.' });
        
        //Verifica a valdade do token informado
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            //console.log(decoded);
            user_Id = decoded.userid;
            
        });
        console.log(user_Id);
        bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS), (err, salt) =>{
            bcrypt.hash(req.body.senha, salt, async (err,hash)=>{
               // console.log(req.body);
                const result = await Colaboradores.update({...req.body,senha: hash}, {where: {id:user_Id}});            ;
                console.log(result);
                res.status(200).send();
            });
        })
        
        
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}
const signup = async (req, res) => {
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
      res.status(200).send({ msg: "Usuário Criado" });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  

const login = async (req, res) => {
    try {
        const colaboradores =  await Colaboradores.findOne({where: {email: req.body.email}})
        
        if(colaboradores) {
            bcrypt.compare(req.body.senha, colaboradores.senha, (err, ok) => {
                if(ok) {
                    const webtoken = jwt.sign({...colaboradores},process.env.SECRET,{expiresIn:'2h'})
                    res.status(200).send({msg: "Colaborador logado!",userId: colaboradores.id, userNome: colaboradores.nome, token: webtoken});
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
   res.status(200).send();
}


export default { signup, login, logout, resetPassword,getTokenResetPassword}