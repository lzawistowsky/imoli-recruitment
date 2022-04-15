import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import 'dotenv/config'

import filmsRoutes from './routes/films'
import favoritesRoutes from './routes/favorites'

const app = express()

app.use(helmet())
app.use(express.json())

app.use(filmsRoutes)
app.use(favoritesRoutes)

mongoose.connect(process.env.DB_CONNECT as string).then(res => {
    app.listen(process.env.PORT || 8080)
}).catch(err => {
    console.log(err)
})