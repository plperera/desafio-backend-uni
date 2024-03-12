import { createProduct, deleteProduct, getAllProducts, updateProduct } from '@/controllers/product-controller'
import { Router } from 'express'

const productRouter = Router()

productRouter
    .get("", getAllProducts)
    .post("", createProduct)
    .put("", updateProduct)
    .delete("", deleteProduct)

export { productRouter }