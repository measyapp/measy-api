//Metodo que verifica se o usuário ta autenticado
const verifyAuth = (req, res, next) =>{
    if(req.session.userId){
        next();
    }else{
        res.status(401).send({msg: "Colaborador não autorizado"})
    }
}

export default {verifyAuth}