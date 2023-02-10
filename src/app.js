import express from "express"
import dotenv from "dotenv"
import router from "./routes/index"
import cors from "cors"
import session from "express-session"
import { v4 as uuid } from "uuid"

require('dotenv').config({path:__dirname+'/./../../.env'})

const app = express()
const PORT =  process.env.PORT || process.env.PORT_BACK

app.use(cors({
            origin: [ 'http://localhost:3367',
                      'http://localhost:3366',
                      'https://measy-web.vercel.app',
                      'https://measy-measy-pes.vercel.app/',
                      'https://measy-teste.vercel.app'
                      
                    ],
            methods: ['POST', 'PUT', 'GET','OPTIONS', 'HEAD','PATCH','DELETE'],
            credentials:true,
            optionsSuccessStatus: 200,
            allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With','Access-Control-Allow-Origin'] 
            
                            
        }));
app.use(express.json())
//Configurando Sessões
/*app.use(session({
    genid: () => { 
        return uuid()
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 10000},
}))
*/

/*app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,Content-Length,X-Requested-With,access-control-allow-origin');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // handle OPTIONS method
    if ('OPTIONS' == req.method) {
        return res.sendStatus(200);
    } else {
        next();
    }
});*/
app.use(router)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`)
})
