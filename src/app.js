import express from "express"
import dotenv from "dotenv"
import router from "./routes/index"
import cors from "cors"
import session from "express-session"
import { v4 as uuid } from "uuid"

require("dotenv").config()

const app = express()
const PORT =  process.env.PORT || process.env.PORT_BACK
app.use(cors({
            origin: process.env.ORIGIN ,
            methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
            credentials:true}));
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
app.use(router)
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`)
})
