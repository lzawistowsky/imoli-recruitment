import express from 'express'
import helmet from 'helmet'
import 'dotenv/config'

import { AppDataSource } from './data-sorce'
import errorHandler from './exceptions/errorHandler'

import filmsRoutes from './routes/films'
import favoritesRoutes from './routes/favorites'

const app = express()

app.use(helmet())
app.use(express.json())

app.use(filmsRoutes)
app.use(favoritesRoutes)

app.use(errorHandler)

AppDataSource.initialize().then(() => {
    app.listen(process.env.PORT || 8080)
}).catch((err) => {
    console.error("Error during Data Source initialization:", err)
})