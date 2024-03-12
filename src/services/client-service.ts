import clientRepository from "@/repositories/client-repository"
import { clientBody } from "@/schemas/client-schema"

async function getAllClientsData(){
    const result = await clientRepository.findAll()
    return result
}
async function createClient(body: Omit<clientBody, "id">){
    const result = await clientRepository.createClient(body)
    return result
}
async function findClientByEmail(name: string){
    const result = await clientRepository.findByEmail(name)
    return result
}
async function findClientById(clientId: number){
    const result = await clientRepository.findById(clientId)
    return result
}
async function updateClient(body: clientBody){
    const result = await clientRepository.updateClient(body)
    return result
}
async function deleteClient(clientId: number){
    const result = await clientRepository.deleteClient(clientId)
    return result
}

const clientService = {
    getAllClientsData,
    createClient,
    findClientByEmail,
    findClientById,
    updateClient,
    deleteClient
}

export default clientService