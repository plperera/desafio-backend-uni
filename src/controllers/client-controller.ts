import { clientBody } from "@/schemas/client-schema";
import clientService from "@/services/client-service";

import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getAllClients(req: Request, res: Response){
    try {        

        const AllClients = await clientService.getAllClientsData()

        return res.send(AllClients).status(httpStatus.OK)
        

    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function createClient(req: Request, res: Response){
    try {     
        
        const { nome, sobrenome, email, idade }: Omit<clientBody, "id"> = req.body

        //verifica o body

        const hasEmail = await clientService.findClientByEmail(email)

        if (hasEmail) {
            return res.sendStatus(httpStatus.CONFLICT)
        }

        const result = await clientService.createClient({ nome, sobrenome, email, idade })

        return res.send(result).status(httpStatus.CREATED)

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function updateClient(req: Request, res: Response){
    try {     
        
        const { nome, sobrenome, email, idade, id }: clientBody = req.body

        //verifica o body

        const hasClient = await clientService.findClientById(id)

        if (!hasClient) {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }

        const hasEmail = await clientService.findClientByEmail(email)

        if (hasEmail && hasEmail.id !== id) {
            return res.sendStatus(httpStatus.CONFLICT)
        }

        const result = await clientService.updateClient({ nome, sobrenome, email, idade, id })

        return res.send(result).status(httpStatus.OK)

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function deleteClient(req: Request, res: Response){
    try {     
        
        const { id } = req.body

        //verifica o body

        const hasClient = await clientService.findClientById(id)

        if (!hasClient) {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }

        const result = await clientService.deleteClient(id)

        return res.send(result).status(httpStatus.OK)

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}