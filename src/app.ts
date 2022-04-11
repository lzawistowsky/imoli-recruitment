import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()

mongoose.connect(process.env.DB_CONNECT as string).then(res => {
    app.listen(process.env.PORT)
}).catch(err => {
    console.log(err)
})