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

            res.status(201).send({message: "Foto postada com sucesso!"})
        } catch (error) {
            res.status(error.statusCode).send({ error: error.message });
        }
    }
}

export default new ImageController()