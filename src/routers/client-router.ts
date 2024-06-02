import { createClient, deleteClient, getAllClients, updateClient } from '@/controllers/client-controller'
import { cacheMiddleware } from '@/middlewares/cache-middleware'
import { clientBody } from '@/middlewares/client-middleware'
import { Router } from 'express'

const clientRouter = Router()

clientRouter
    .get("", cacheMiddleware, getAllClients)
    .post("", clientBody.create, createClient)
    .put("", clientBody.update, updateClient)
    .delete("", clientBody.deleteById, deleteClient)

export { clientRouter }