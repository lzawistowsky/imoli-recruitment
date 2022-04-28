import { RequestHandler } from "express"
import fetch from "node-fetch"
import HttpException from "../exceptions/HttpException"

type filmType = { release_date: string, title: string, episode_id: number }

export const getFilms: RequestHandler = async (req, res, next) => {
    try {
        const externalData = await fetch('https://swapi.dev/api/films/')
        const { results } = await externalData.json()

        if(!results) {
            const error = new HttpException(404, 'films not found')
            throw error
        }
        
        let i = 0
        const films: filmType[] = await results.map((film: filmType) => {
            i++
            return {
                release_date: film.release_date,
                title: film.title,
                id: i
            }
        })

        res.status(200).json({
            films: films
        })
    } catch (e) {
        next(e)
    }
}