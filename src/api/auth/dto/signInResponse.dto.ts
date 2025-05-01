export class SignInResponseDto {
    success = true;
    accessToken: string 

    constructor(accessToken: string) {
        this.accessToken =  accessToken;
    }
}