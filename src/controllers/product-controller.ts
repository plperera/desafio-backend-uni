// src/controllers/product-controller.ts
import { productBody } from "@/schemas/product-schema";
import productService from "@/services/product-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import cache from "@/config/cache";

export async function getAllProducts(req: Request, res: Response) {
    try {
        const AllProducts = await productService.getAllProductsData();
        return res.status(httpStatus.OK).send(AllProducts);
    } catch (error) {
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function createProduct(req: Request, res: Response) {
    try {
        const { nome, preco, descricao }: Omit<productBody, "id"> = req.body;
        const hasName = await productService.findProductByName(nome);

        if (hasName) {
            return res.sendStatus(httpStatus.CONFLICT);
        }

        const result = await productService.createProduct({ nome, preco, descricao });

        // Clear relevant cache
        cache.keys().forEach(key => {
            if (key.includes('/produtos')) {
                cache.del(key);
                console.log(`[Cache] Cache cleared for key: ${key}`);
            }
        });

        return res.status(httpStatus.CREATED).send(result);
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        const { nome, preco, descricao, id }: productBody = req.body;
        const hasProduct = await productService.findProductById(id);

        if (!hasProduct) {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }

        const hasName = await productService.findProductByName(nome);

        if (hasName && hasName.id !== id) {
            return res.sendStatus(httpStatus.CONFLICT);
        }

        const result = await productService.updateProduct({ nome, preco, descricao, id });

        // Clear relevant cache
        cache.keys().forEach(key => {
            if (key.includes('/produtos')) {
                cache.del(key);
                console.log(`[Cache] Cache cleared for key: ${key}`);
            }
        });

        return res.status(httpStatus.OK).send(result);
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        const { id } = req.body;
        const hasProduct = await productService.findProductById(id);

        if (!hasProduct) {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }

        const result = await productService.deleteProduct(id);

        // Clear relevant cache
        cache.keys().forEach(key => {
            if (key.includes('/produtos')) {
                cache.del(key);
                console.log(`[Cache] Cache cleared for key: ${key}`);
            }
        });

        return res.status(httpStatus.OK).send(result);
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
