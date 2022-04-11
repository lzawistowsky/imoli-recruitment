import { Router } from "express"

import { getFilms } from "../controllers/films"

const router = Router()

router.get('/films', getFilms)

export default router