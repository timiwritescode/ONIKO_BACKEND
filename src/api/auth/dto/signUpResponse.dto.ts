export class SignUpResponseDto {
    message = "User created created successfully";
    user_id: string;
    
    constructor(user_id: string) {
        this.user_id = user_id;
    }
}