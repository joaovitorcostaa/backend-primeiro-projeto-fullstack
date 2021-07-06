import { Request, Response } from "express"
import imageBusiness  from "../business/ImageBusiness"
import { ImageInputDTO } from "../model/Image"

export class ImageController {
    public async createImage(req: Request, res: Response){
        try {
            const token = req.headers.authorization as string

            const input: ImageInputDTO = {
                title: req.body.title,
                file: req.body.file,
                tags: req.body.tags,
                collection: req.body.collection,
            }

            await imageBusiness.createImage(input, token)

            res.status(201).send({message: "Imagem postada com sucesso!"})
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 400;
              }
              if (!error.statusCode) {
                error.statusCode = 400;
              }
            res.status(error.statusCode).send({ error: error.message });
        }
    }

    public async getImageById(req: Request, res: Response){
        try {
            const token = req.headers.authorization as string

            const id: string = req.params.id

            const result = await imageBusiness.getImageById(token, id)

            res.status(201).send(result)
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 400;
              }
            res.status(error.statusCode).send({ error: error.message });
        }
    }

    public async getAllImage(req: Request, res: Response){
        try {
            const token = req.headers.authorization as string

            const result = await imageBusiness.getAllImage(token)

            res.status(201).send(result)
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 400;
              }
            res.status(error.statusCode).send({ error: error.message });
        }
    }
}

export default new ImageController()