import { User } from "../../src/model/User";
import { userMock } from "./usersMock";

export class UserDataBaseMock {
    public async getUserById(id: string): Promise <User | undefined> {
        switch(id){
            case "id_existente":
            return userMock
            default: 
            undefined
        }
    }
}

export default new UserDataBaseMock()