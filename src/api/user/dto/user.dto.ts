import { IUser } from "../../../interface/user.interface";

export class UserDto {
    user_id: string;
    email: string;
    username: string;

    constructor(userObject: Partial<IUser>) {
        this.user_id = userObject.user_id;
        this.email = userObject.email;
        this.username = userObject.username;
    }
}