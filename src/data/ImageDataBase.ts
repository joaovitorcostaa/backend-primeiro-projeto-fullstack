import { Image } from "../model/Image";
import { BaseDatabase } from "./BaseDataBase";

export class ImageDataBase extends BaseDatabase {
    private static TABLE_NAME = "labeimage_images"

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
        id: string,
        title: string,
        author: string,
        date: Date,
        file: string,
        tags: string,
        collection: string
    ): Promise<any> {
        try {
            await this.getConnection()
            .insert({            
                id,
                title,
                author,
                date,
                file,
                tags,
                collection
            })
            .into(ImageDataBase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getAllImage(): Promise<any> {
        try {
            const result = await this.getConnection()
            .select("*")
            .from(ImageDataBase.TABLE_NAME)

            return result
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getImageById(id: string): Promise<Image | undefined> {
        try {
            const result = await this.getConnection()
            .select("*")
            .from(ImageDataBase.TABLE_NAME)
            .where({id})

            return this.toModel(result[0])
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}

export default new ImageDataBase()