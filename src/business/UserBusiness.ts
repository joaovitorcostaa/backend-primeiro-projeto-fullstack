import userDataBase, { UserDataBase } from "../data/UserDataBase";
import authenticator, { Authenticator } from "../services/Authenticator";
import hashManager, { HashManager } from "../services/HashManager";
import idGenerator, { IdGenerator } from "../services/IdGenerator";
import { LoginInputDTO, UserInputDTO } from "../model/User";
import { CustomError } from "../error/CustomError";

export class UserBusiness {

    constructor(
        private userDataBase: UserDataBase,
        private authenticator: Authenticator,
        private hashManager: HashManager,
        private idGenerator: IdGenerator
    ) {}


    async createUser(user: UserInputDTO){
        try {
            if(!user){
                throw new CustomError(422, "Faltam informações!")
            }

            if (user.email.indexOf("@") === -1) {
                throw new CustomError(422, "Email inválido");
            }
    
             if (user.password.length < 6) {
                throw new CustomError(422, "Senha inválida");
            }

            const id = this.idGenerator.generate()
    
            const hashPassword = await this.hashManager.hash(user.password)
    
            await this.userDataBase.createUser(id, user.email, user.name, user.nickname, hashPassword)
    
            const accessToken = this.authenticator.generateToken({ id })
    
            return accessToken
        } catch (error) {
            if (error.message.includes("key 'email'")) {
                throw new CustomError(409, "Esse email já está sendo usado")
             }
             throw new CustomError(error.statusCode, error.message)
        }

    }

    public async login(loginData: LoginInputDTO) {
        try {
            if (!loginData.email || !loginData.password) {
                throw new CustomError(422, "Informações faltando");
             }
    
             const user = await this.userDataBase.getUserByEmail(loginData.email)

             if (!user){
                throw new CustomError(401, "Usuário não encontrado");
             }

             const isPasswordCorrect = await this.hashManager.compare(
                 loginData.password,
                  user.getPassword())

             if (!isPasswordCorrect) {
                throw new CustomError(401, "Senha incorreta");
             }
             
            const accessToken = this.authenticator.generateToken({id: user.getId()})

            return accessToken
        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async getUserById(id: string) {
        try {
            if (!id) {
                throw new CustomError(422, "Informações faltando");
             }

             const userData = await this.userDataBase.getUserById(id)

             if (!userData) {
                throw new CustomError(404, "Esse usuário não existe");
             }

             const user = {
                 id: userData.getId(),
                 name: userData.getName(),
                 nickname: userData.getNickname(),
                 email: userData.getEmail()
             }

             return user
        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}

export default new UserBusiness(
    userDataBase,
    authenticator,
    hashManager,
    idGenerator
)