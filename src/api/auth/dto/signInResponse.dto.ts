export class SignInResponseDto {
    success = true;
    message = "Login successful"
    accessToken: string 

    constructor(accessToken: string) {
        this.accessToken =  accessToken;
    }
}