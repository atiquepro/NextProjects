import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { readdirSync } from 'fs'

const morgan = require('morgan')
require('dotenv').config()
const app = express()

//db
mongoose.connect(process.env.DATABASE, {
    // useNewUrlParser:true,
    // useFindAndModify:false,
    // useUnifiedTopology:true,
    // useCreateIndex:true


}).then(() => console.log('DB Connected'))
  .catch(err => console.log("DB connection error : ", err))

//middlewares

app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:["http://localhost:3000"]}))


//autoload routes

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)))


const port = 8000
app.listen(port, () => console.log(`server running on port ${port}`))