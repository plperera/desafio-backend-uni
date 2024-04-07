import { prisma } from "@/config"
import { clientBody } from "@/schemas/client-schema"

async function findAll(){
    const result = await prisma.clientes.findMany()
    return result
}
async function findByEmail(email: string){
    const result = await prisma.clientes.findFirst({
        where: {
            email: email
        }
    })
    return result
}
async function findById(id: number){
    const result = await prisma.clientes.findFirst({
        where: {
            id: id
        }
    })
    return result
}
async function createClient(body: Omit<clientBody, "id">){
    const result = await prisma.clientes.create({
        data: {
            email: body.email,
            idade: body.idade,
            nome: body.nome,
            sobrenome: body.sobrenome
        }
    })
    return result
}
async function updateClient(body: clientBody){
    const result = await prisma.clientes.update({
        where: {
            id: body.id
        },
        data: {
            email: body.email,
            idade: body.idade,
            nome: body.nome,
            sobrenome: body.sobrenome
        }
    })
    return result
}
async function deleteClient(id: number){
    const result = await prisma.clientes.delete({
        where: {
            id: id
        }
    })
    return result
}
const clientRepository = {
    findAll,
    findByEmail,
    findById,
    createClient,
    updateClient,
    deleteClient
}

export default clientRepository