import { productBody } from "@/schemas/product-schema";
import productService from "@/services/product-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getAllProducts(req: Request, res: Response){
    try {        

        const AllProducts = await productService.getAllProductsData()

        return res.send(AllProducts).status(httpStatus.OK)
        

    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function createProduct(req: Request, res: Response){
    try {     
        
        const { nome, preco, descricao }: Omit<productBody, "id"> = req.body

        //verifica o body

        const hasName = await productService.findProductByName(nome)

        if (!!hasName) {
            return res.sendStatus(httpStatus.CONFLICT)
        }

        const result = await productService.createProduct({ nome, preco, descricao })

        return res.send(result).status(httpStatus.CREATED)

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function updateProduct(req: Request, res: Response){
    try {     
        
        const { nome, preco, descricao, id }: productBody = req.body

        //verifica o body

        const hasProduct = await productService.findProductById(id)

        if (!hasProduct || !hasProduct ) {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }

        const hasName = await productService.findProductByName(nome)

        if (hasName && hasName.id !== id) {
            return res.sendStatus(httpStatus.CONFLICT)
        }

        const result = await productService.updateProduct({ nome, preco, descricao, id })

        return res.send(result).status(httpStatus.OK)

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function deleteProduct(req: Request, res: Response){
    try {     
        
        const { id } = req.body

        //verifica o body

        const hasProduct = await productService.findProductById(id)

        if (!hasProduct) {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }

        const result = await productService.deleteProduct(id)

        return res.send(result).status(httpStatus.OK)

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}