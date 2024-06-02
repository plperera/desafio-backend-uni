// src/controllers/client-controller.ts
import { clientBody } from "@/schemas/client-schema";
import clientService from "@/services/client-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import cache from "@/config/cache";

export async function getAllClients(req: Request, res: Response) {
    try {
        const AllClients = await clientService.getAllClientsData();
        return res.status(httpStatus.OK).send(AllClients);
    } catch (error) {
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function createClient(req: Request, res: Response) {
    try {
        const { nome, sobrenome, email, idade }: Omit<clientBody, "id"> = req.body;
        const hasEmail = await clientService.findClientByEmail(email);

        if (hasEmail) {
            return res.sendStatus(httpStatus.CONFLICT);
        }

        const result = await clientService.createClient({ nome, sobrenome, email, idade });

        // Clear relevant cache
        cache.keys().forEach(key => {
            if (key.includes('/clientes')) {
                cache.del(key);
                console.log(`[Cache] Cache cleared for key: ${key}`);
            }
        });

        return res.status(httpStatus.CREATED).send(result);
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function updateClient(req: Request, res: Response) {
    try {
        const { nome, sobrenome, email, idade, id }: clientBody = req.body;
        const hasClient = await clientService.findClientById(id);

        if (!hasClient) {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }

        const hasEmail = await clientService.findClientByEmail(email);

        if (hasEmail && hasEmail.id !== id) {
            return res.sendStatus(httpStatus.CONFLICT);
        }

        const result = await clientService.updateClient({ nome, sobrenome, email, idade, id });

        // Clear relevant cache
        cache.keys().forEach(key => {
            if (key.includes('/clientes')) {
                cache.del(key);
                console.log(`[Cache] Cache cleared for key: ${key}`);
            }
        });

        return res.status(httpStatus.OK).send(result);
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteClient(req: Request, res: Response) {
    try {
        const { id } = req.body;
        const hasClient = await clientService.findClientById(id);

        if (!hasClient) {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }

        const result = await clientService.deleteClient(id);

        // Clear relevant cache
        cache.keys().forEach(key => {
            if (key.includes('/clientes')) {
                cache.del(key);
                console.log(`[Cache] Cache cleared for key: ${key}`);
            }
        });

        return res.status(httpStatus.OK).send(result);
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
