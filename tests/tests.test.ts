import { UserBusiness } from "../src/business/UserBusiness";
import { UserDataBase } from "../src/data/UserDataBase";
import hashManagerMock from "./mocks/hashManagerMock";
import idGeneratorMock from "./mocks/idGeneratorMock";
import authenticatorMock from "./mocks/authenticatorMock";
import userDataBaseMock from "./mocks/userDataBaseMock";

const UserBusinessMock = new UserBusiness(
    userDataBaseMock as UserDataBase,
    authenticatorMock,
    hashManagerMock,
    idGeneratorMock
)

describe("getUserById", () => {
    test("Usuário não existente", async() => {
        expect.assertions(2)
        try {
            await UserBusinessMock.getUserById("id_falso")
        } catch (error) {
            expect(error.message).toBe("Esse usuário não existe")
            expect(error.statusCode).toBe(404) 
        }
    })

    test("Usuário existente", async () => {
        expect.assertions(2)
        try {
            const getUserById = jest.fn(
                (id: string) => UserBusinessMock.getUserById(id)
            )

           const result = await getUserById("id_existente")

           expect(getUserById).toHaveBeenCalledWith("id_existente")
           expect(result).toEqual({
            id: "id_existente",
            name: "greg",
            nickname: "greguin",
            email: "greg@gmail.com"
           })
        } catch (error) {
            console.log(error.message)
        }
    })
})