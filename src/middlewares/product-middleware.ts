import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {

    const isValid = createProductSCHEMA.validate(req.body, {abortEarly: false})

    if(isValid.error){
        console.log(isValid.error)
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    next()
    
}
