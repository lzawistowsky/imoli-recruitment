import { RequestHandler } from "express"
import { validationResult } from "express-validator"

export const checkErrors: RequestHandler = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({
        errors: errors.array()
    })
    next()
}