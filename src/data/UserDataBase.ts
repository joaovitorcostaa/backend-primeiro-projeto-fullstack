import { User } from "../model/User";
import { BaseDatabase } from "./BaseDataBase";

export class UserDataBase extends BaseDatabase {
    private static TABLE_NAME = "labeimage_users"

    private toModel(dbModel?: any): User | undefined {
        return (
           dbModel &&
           new User(
              dbModel.id,
              dbModel.name,
              dbModel.nickname,
              dbModel.email,
              dbModel.password
           )
        );
     }

     public async createUser(
        id: string,
        email: string,
        name: string,
        nickname: string,
        password: string
    ): Promise<any> {
        try {
            await this.getConnection()
            .insert({
                id,
                email,
                name,
                nickname,
                password
            })
            .into(UserDataBase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getUserById(
        id: string
    ) : Promise<User | undefined> {
        try {
          const result = await this.getConnection()
            .select("*")
            .from(UserDataBase.TABLE_NAME)
            .where({id})

            return this.toModel(result[0])
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getUserByEmail(
        email: string
        ): Promise<User | undefined> {
        try {
            const result = await this.getConnection()
            .select("*")
            .from(UserDataBase.TABLE_NAME)
            .where({ email })

            return this.toModel(result[0])
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}

export default new UserDataBase()