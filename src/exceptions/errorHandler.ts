import HttpException from './HttpException'
import { ErrorRequestHandler } from "express"

const errorHandler: ErrorRequestHandler = async (error: HttpException, req, res, next) => {
    console.log(error)
    const status = error.status || 500
    const message = error.message
    const data = error.cause
    res.status(status).json({
      error: {
        message: message,
        status: status,
      },
      data: data,
    })
}

export default errorHandler