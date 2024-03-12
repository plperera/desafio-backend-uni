import productRepository from "@/repositories/product-repository"
import { productBody } from "@/schemas/product-schema"

async function getAllProductsData(){
    const result = await productRepository.findAll()
    return result
}
async function createProduct(body: Omit<productBody, "id">){
    const result = await productRepository.createProduct(body)
    return result
}
async function findProductByName(name: string){
    const result = await productRepository.findByName(name)
    return result[0]
}
async function findProductById(productId: number){
    const result = await productRepository.findById(productId)
    return result
}
async function updateProduct(body: productBody){
    const result = await productRepository.updateProduct(body)
    return result
}
async function deleteProduct(productId: number){
    const result = await productRepository.deleteProduct(productId)
    return result
}

const productService = {
    getAllProductsData,
    createProduct,
    findProductByName,
    findProductById,
    updateProduct,
    deleteProduct
}

export default productService