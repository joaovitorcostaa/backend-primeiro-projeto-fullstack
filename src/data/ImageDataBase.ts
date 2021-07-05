import { Image } from "../model/Image";
import { BaseDatabase } from "./BaseDataBase";

export class ImageDataBase extends BaseDatabase {
    private static TABLE_NAME = "labephoto_photos"

    private toModel(dbModel?: any): Image | undefined {
        return (
            dbModel && 
            new Image(
                dbModel.id,
                dbModel.title,
                dbModel.author,
                dbModel.date,
                dbModel.file,
                dbModel.tags,
                dbModel.collection
            )
        )
    }

    public async createImage(
        image: Image
    ): Promise<void> {
        try {
            await this.getConnection()
            .insert({            
                id: image.getId(),
                title: image.getTitle(),
                author: image.getAuthor(),
                date: image.getDate(),
                file: image.getFile(),
                tags: image.getTags(),
                collection: image.getCollection()
            })
            .into(ImageDataBase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}

export default new ImageDataBase()