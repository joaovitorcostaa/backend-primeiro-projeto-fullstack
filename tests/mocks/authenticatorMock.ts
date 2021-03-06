export class TokenGeneratorMock {
    public generateToken = (input: AuthenticationData) => {
        return "token_mock"
    }
    public getData = (token: string) => {
        return {
            id: "token_existente"
        }
    }
}

export interface AuthenticationData {
    id: string;
}
  
export default new TokenGeneratorMock()  