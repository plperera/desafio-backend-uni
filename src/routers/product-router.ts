import { createProduct, deleteProduct, getAllProducts, updateProduct } from '@/controllers/product-controller'
import { cacheMiddleware } from '@/middlewares/cache-middleware'
import { productBody } from '@/middlewares/product-middleware'
import { Router } from 'express'

const productRouter = Router()

productRouter
    .get("", cacheMiddleware, getAllProducts)
    .post("", productBody.create, createProduct)
    .put("", productBody.update, updateProduct)
    .delete("", productBody.deleteById, deleteProduct)

export { productRouter }