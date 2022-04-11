import { RequestHandler } from "express"
import fetch from "node-fetch"
import HttpException from "../exceptions/HttpException"

type filmType = { releaseDate: string; title: string; episode_id: number }

export const getFilms: RequestHandler = async (req, res, next) => {
    try {
        const externalData = await fetch('https://swapi.dev/api/films/')
        const { results } = await externalData.json()

        if(!results) {
            const error = new HttpException(404, 'films not found')
            throw error
        }
        
        const films: filmType[] = await results.map((film: filmType) => {
            return {
                releaseDate: film.releaseDate,
                title: film.title,
                episode_id: film.episode_id
            }
        })

        res.status(200).json({
            films: films
        })
    } catch (e) {
        console.log(e)
    }
}