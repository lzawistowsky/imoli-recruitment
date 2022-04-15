import { Router } from "express"

import { postFavorites, getFavorites, getList, getListFile } from "../controllers/favorites"

const router = Router()

router.post('/favorites', postFavorites)
router.get('/favorites', getFavorites)
router.get('/favorites/:id', getList)
router.get('/favorites/:id/file', getListFile)

export default router