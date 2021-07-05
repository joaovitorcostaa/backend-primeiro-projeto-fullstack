import imageDataBase, { ImageDataBase } from "../data/ImageDataBase";
import authenticator, { Authenticator } from "../services/Authenticator";
import idGenerator, { IdGenerator } from "../services/IdGenerator";
import { CustomError } from "../error/CustomError";
import { Image, ImageInputDTO } from "../model/Image";

export class ImageBusiness {
    constructor(
        private imageDataBase: ImageDataBase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }
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

            await this.imageDataBase.createImage(new Image(            
                 ImageId,
                 image.title,
                 userData.id,
                 new Date(),
                 image.file,
                 image.tags,
                 image.collection))

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