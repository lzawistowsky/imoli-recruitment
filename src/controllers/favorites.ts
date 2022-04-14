import { RequestHandler } from "express"
import { HydratedDocument } from 'mongoose';
import fetch from "node-fetch"
import HttpException from "../exceptions/HttpException"
import { Types } from "mongoose"

import { Film, IFilm } from "../models/film"
import { List, IList } from "../models/list"
import { Character, ICharacter } from "../models/character"

type PostFavoritesBody = { listName: string, films: string[] }
type GetFavoritesQuery = { search: string, page: number, limit: number }
type GetListParams = { id: Types.ObjectId }

export const postFavorites: RequestHandler = async (req, res, next) => {
    try {
        const body = req.body as PostFavoritesBody
        const listName = body.listName
        const films = body.films

        let filmsList: Array<Types.ObjectId> = []
        for (const film of films) {
            const externalData = await fetch(`https://swapi.dev/api/films/${film}`)
            const result = await externalData.json()

            if(!result) {
                const error = new HttpException(404, 'film not found')
                throw error
            }

            const exsistingFilm = await Film.findOne({title: result.title})
            if(!exsistingFilm) {
                let characterList: Array<Types.ObjectId> = []
                for (const character of result.characters) {
                    const fetchCharacter = await fetch(character)
                    const rawCharacter = await fetchCharacter.json()

                    const existingCharacter = await Character.findOne({name: rawCharacter.name})
                    if(!existingCharacter) {
                        const newCharacter: HydratedDocument<ICharacter> = new Character({
                            name: rawCharacter.name
                        })
                        await newCharacter.save()
                        
                        characterList.push(newCharacter._id)
                    } else {
                        characterList.push(existingCharacter._id)
                    }
                }

                const newFilm: HydratedDocument<IFilm> = new Film({
                    title: result.title,
                    releaseDate: result.release_date,
                    characterList: characterList
                })
                await newFilm.save()

                filmsList.push(newFilm._id)
            } else {
                filmsList.push(exsistingFilm._id)
            }
        }

        const list: HydratedDocument<IList> = new List({
            listName: listName,
            films: filmsList
        })

        const newList = await list.save()

        res.status(200).json({
            list: newList
        })
    } catch (e) {
        console.log(e)
    }
}

export const getFavorites: RequestHandler = async (req, res, next) => {
    try {
        const query = req.query as unknown as GetFavoritesQuery
        const search = query.search
        const page = query.page || 1
        const limit = query.page || 10

        let filter = {}
        if (search) filter = { 
            listName: { $regex: search, $options: "i" } 
        }

        const lists = await List.find(filter).limit(limit).skip(limit * ( page - 1 ))
        if(!lists) {
            const error = new HttpException(404, 'list not found')
            throw error
        }

        const mappedList = lists.map(list => {
            return {
                id: list._id,
                name: list.listName
            }
        })
        
        res.status(200).json({
            lists: mappedList
        })
    } catch (e) {
        console.log(e)
    }
}

export const getList: RequestHandler = async (req, res, next) => {
    try {
        const params = req.params as unknown as GetListParams
        const id = params.id

        const list = await List.findOne({_id: id}).populate({
            path: 'films',
            populate: { path: 'characterList' }
        })
        if(!list) {
            const error = new HttpException(404, 'list with selected id not found')
            throw error
        }

        res.status(200).json({
            list: list
        })
    } catch (e) {
        console.log(e)
    }
}