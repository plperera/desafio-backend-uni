import { prisma } from "@/config"
import { productBody } from "@/schemas/product-schema"


async function findAll(){
    const result = await prisma.produtos.findMany()
    return result
}
async function findByName(name: string){
    const result = await prisma.produtos.findFirst({
        where: {
            nome: name
        }
    })
    return result
}
async function findById(id: number){
    const result = await prisma.produtos.findFirst({
        where: {
            id: id
        }
    })
    return result
}
async function createProduct(body: Omit<productBody, "id">){
    const result = await prisma.produtos.create({
        data: {
            nome: body.nome,
            preco: body.preco,
            descricao: body.descricao
        }
    })
    return result
}
async function updateProduct(body: productBody){
    const result = await prisma.produtos.update({
        where: {
            id: body.id
        },
        data: {
            nome: body.nome,
            preco: body.preco,
            descricao: body.descricao
        }
    })
    return result
}
async function deleteProduct(id: number){
    const result = await prisma.produtos.delete({
        where: {
            id: id
        }
    })
    return result
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