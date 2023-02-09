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
            methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD','PATCH'],
            credentials:true,
            allowedHeaders: 'X-Requested-With,content-type',
            

        }));

app.use(function(req, res, next) {
    // handle OPTIONS method
    if ('OPTIONS' == req.method) {
        return res.sendStatus(200);
    } else {
        next();
    }
});
app.use(express.json())
console.log(process.env.NODE_ENV);
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
app.use(router)
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`)
})
