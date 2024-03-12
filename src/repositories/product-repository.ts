import { productBody } from "@/schemas/product-schema"

let productDB: productBody[] = [
    {nome: "produto1", id: 1, preco: 123}
]

async function findAll(){
    return productDB
}
async function findByName(name: string){
    return productDB.filter( e => e.nome === name)
}
async function findById(id: number){
    return productDB.filter( e => e.id === id)
}
async function createProduct(body: Omit<productBody, "id">){
    productDB.push({...body, id: 99})
    return productDB[productDB.length - 1]
}
async function updateProduct(body: productBody){
    productDB = productDB.map( e => {
        if (e.id === body.id) {
            return body
        }
        return e
    })
    return productDB
}
async function deleteProduct(id: number){
    productDB = productDB.filter( e => e.id !== id)
    return productDB
}

const productRepository = {
    findAll,
    findByName,
    findById,
    createProduct,
    updateProduct,
    deleteProduct
}

export default productRepository