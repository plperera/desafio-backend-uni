import { createClient, deleteClient, getAllClients, updateClient } from '@/controllers/client-controller'
import { clientBody } from '@/middlewares/client-middleware'
import { Router } from 'express'

const clientRouter = Router()

clientRouter
    .get("", getAllClients)
    .post("", clientBody.create, createClient)
    .put("", clientBody.update, updateClient)
    .delete("", clientBody.deleteById, deleteClient)

export { clientRouter }