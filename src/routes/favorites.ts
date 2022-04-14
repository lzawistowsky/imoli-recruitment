import { Router } from "express"

import { postFavorites, getFavorites, getList } from "../controllers/favorites"

const router = Router()

router.post('/favorites', postFavorites)
router.get('/favorites', getFavorites)
router.get('/favorites/:id', getList)

export default router