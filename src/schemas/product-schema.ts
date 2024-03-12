import joi from "joi"

export type productBody = {
    id: number,
    nome: string,
    descricao: string,
    preco: number,
}

const create = joi.object<Omit<productBody, "id">>({
    nome: joi.string().min(3).max(100).required(),
    preco: joi.number().min(0).required(),
});

const update = joi.object<productBody>({
    id: joi.number().min(0).integer().required(),
    nome: joi.string().min(3).max(100).required(),
    preco: joi.number().min(0).required(),
});

const deleteById = joi.object<{id: number}>({
    id: joi.number().min(0).integer().required()
});

const productSCHEMA = {
    create,
    update,
    deleteById
}

export {productSCHEMA}