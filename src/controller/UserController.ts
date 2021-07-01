import { Request, Response } from "express"
import userBusiness from "../business/UserBusiness"

export class UserController {
    public async signup(req: Request, res: Response) {
        try {
            const { name, nickname, email, password } = req.body

            const user = {
                name,
                nickname,
                email,
                password
            }

            const result = await userBusiness.createUser(user)
            res.status(200).send({token: result})
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const loginData = {
                email,
                password
            }

            const result = await userBusiness.login(loginData)

            res.status(200).send({token: result})
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }
    }

    public async getUserById(req: Request, res: Response){
        try {
           const id = req.params.id as string
  
           const result = await userBusiness.getUserById(id)
  
           res.status(200).send(result)
        } catch (error) {
           const { statusCode, message } = error
           res.status(statusCode || 400).send({ message });
        }
     }

}

export default new UserController()