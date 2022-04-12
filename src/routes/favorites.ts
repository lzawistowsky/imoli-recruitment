import { Router } from "express"

import { postFavorites } from "../controllers/favorites"

const router = Router()

router.post('/favorites', postFavorites)

export default router