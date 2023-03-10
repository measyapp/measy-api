//Metodo que verifica se o usuário ta autenticado
const jwt = require('jsonwebtoken')
const verifyAuth = (req, res, next) =>{
    if(req.session.userId){
        next();
    }else{
        res.status(401).send({msg: "Colaborador não autorizado"})
    }
}
function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    //console.log(token);
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}

function verifyHeader(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if ('OPTIONS' == req.method) {
        return res.sendStatus(200);
    } else {
        next();
    }
}


export default {verifyAuth,verifyJWT,verifyHeader}