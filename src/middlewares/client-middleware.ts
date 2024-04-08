import { clientSCHEMA } from "@/schemas/client-schema";
import { productSCHEMA } from "@/schemas/product-schema";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

async function create(req: Request, res: Response, next: NextFunction) {

    const isValid = clientSCHEMA.create.validate(req.body, {abortEarly: false})

    if(isValid.error){
        console.log(isValid.error)
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    next()  
}

async function update(req: Request, res: Response, next: NextFunction) {
    
    const isValid = clientSCHEMA.update.validate(req.body, {abortEarly: false})

    if(isValid.error){
        console.log(isValid.error)
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    next()  
}
async function deleteById(req: Request, res: Response, next: NextFunction) {
    
    const isValid = clientSCHEMA.deleteById.validate(req.body, {abortEarly: false})

    if(isValid.error){
        console.log(isValid.error)
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    next()  
}
const clientBody = {
    create,
    update,
    deleteById
}

export {clientBody}