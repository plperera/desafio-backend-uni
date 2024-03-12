import { createClient, deleteClient, getAllClients, updateClient } from '@/controllers/client-controller'
import { Router } from 'express'

const clientRouter = Router()

clientRouter
    .get("", getAllClients)
    .post("", createClient)
    .put("", updateClient)
    .delete("", deleteClient)

export { clientRouter }