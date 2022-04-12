import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

import filmsRoutes from './routes/films'
import favoritesRoutes from './routes/favorites'

const app = express()

app.use(filmsRoutes)
app.use(favoritesRoutes)

mongoose.connect(process.env.DB_CONNECT as string).then(res => {
    app.listen(process.env.PORT)
}).catch(err => {
    console.log(err)
})