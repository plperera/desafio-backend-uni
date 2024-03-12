import joi from "joi"

export type clientBody = {
    clientId: number,
    nome: string,
    sobrenome: string,
    email: string,
    idade: number,
}

const create = joi.object<Omit<clientBody, "productId">>({
    nome: joi.string().min(3).max(100).required(),
    sobrenome: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    idade: joi.number().min(0).integer().required(),
});

const update = joi.object<clientBody>({
    clientId: joi.number().min(0).integer().required(),
    nome: joi.string().min(3).max(100).required(),
    sobrenome: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    idade: joi.number().min(0).integer().required(),
});

const deleteById = joi.object<{clientId: number}>({
    clientId: joi.number().min(0).integer().required()
});

const productSCHEMA = {
    create,
    update,
    deleteById
}

export {productSCHEMA}