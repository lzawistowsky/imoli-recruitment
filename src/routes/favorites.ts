import { Router } from "express"

import { postFavorites, getFavorites, getList, getListFile } from "../controllers/favorites"
import { postFavoritesValidation, getFavoritesValidation, getListValidation } from "../middleware/validation/favoritesValidation"

const router = Router()

router.post('/favorites', postFavoritesValidation, postFavorites)
router.get('/favorites', getFavoritesValidation, getFavorites)
router.get('/favorites/:id', getListValidation, getList)
router.get('/favorites/:id/file', getListValidation, getListFile)

export default router