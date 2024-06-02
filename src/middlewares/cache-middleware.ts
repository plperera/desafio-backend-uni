// src/middlewares/cache-middleware.ts
import { Request, Response, NextFunction } from "express";
import cache from "@/config/cache";

export function cacheMiddleware(req: Request, res: Response, next: NextFunction) {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        console.log(`[Cache] Cache hit for key: ${key}`);
        return res.send(cachedResponse);
    }

    const originalSend = res.send.bind(res);
    res.send = (body: any): Response<any> => {
        cache.set(key, body);
        console.log(`[Cache] Cache set for key: ${key}`);
        return originalSend(body);
    };
    next();
}
