import imageDataBase, { ImageDataBase } from "../data/ImageDataBase";
import authenticator, { Authenticator } from "../services/Authenticator";
import idGenerator, { IdGenerator } from "../services/IdGenerator";
import { CustomError } from "../error/CustomError";
import { ImageInputDTO } from "../model/Image";

export class ImageBusiness {
    constructor(
        private imageDataBase: ImageDataBase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) {}
    async createImage(image: ImageInputDTO, token: string) {
        try {
            if (!image.title || !image.file || !image.tags || !image.collection) {
                throw new CustomError(422, "Informações faltando");
              }

            if(!token){
                throw new CustomError(400, "Você não está logado");
            }

           const userData = this.authenticator.getData(token)

           const ImageId = this.idGenerator.generate()

           await this.imageDataBase.createImage(ImageId, image.title, userData.id, new Date(), image.file, image.tags, image.collection)

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async getImageById(token: string, id: string){
        try {
            if(!token){
                throw new CustomError(400, "Você não está logado");
            }

            const verifiedToken = this.authenticator.getData(token)

            if(!verifiedToken){
                throw new CustomError(400, "Seu token é inválido");
            }

            const result = await this.imageDataBase.getImageById(id)

        const imageDate = new Date(result!.getDate()).toISOString()
        const date = imageDate.split("T")
        const splittedDate = date[0].split("-")
        const correctedDate = `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
        result && result.setDate(correctedDate!)

        return result    
        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async getAllImage(token: string){
        try {
            if(!token){
                throw new CustomError(400, "Você não está logado");
            }

            const verifiedToken = this.authenticator.getData(token)

            if(!verifiedToken){
                throw new CustomError(400, "Seu token é inválido");
            }

            const result = await this.imageDataBase.getAllImage()

            return result    
        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}

export default new ImageBusiness(
    imageDataBase,
    idGenerator,
    authenticator
)