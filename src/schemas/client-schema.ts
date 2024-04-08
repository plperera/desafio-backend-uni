import joi from "joi"

export type clientBody = {
    id: number,
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
    id: joi.number().min(0).integer().required(),
    nome: joi.string().min(3).max(100).required(),
    sobrenome: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    idade: joi.number().min(0).integer().required(),
});

const deleteById = joi.object<{id: number}>({
    id: joi.number().min(0).integer().required()
});

const clientSCHEMA = {
    create,
    update,
    deleteById
}

export {clientSCHEMA}