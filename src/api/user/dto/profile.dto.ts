import { IProfile } from "../../../interface/profile.interface";
import { IUser } from "../../../interface/user.interface";
import { UserDto } from "./user.dto";

export class ProfileResponseDto {
    user: UserDto;
    first_name: string;
    last_name: string;
    country: string;
    bio: string

    constructor(userObject: Partial<IUser>) {
        const profile =  userObject.profile as IProfile | undefined;
        this.first_name = profile?.first_name ?? "";
        this.last_name = profile?.last_name ?? "";
        this.country = profile?.country ?? "";
        this.bio = profile?.bio ?? "";

        this.user = new UserDto(userObject)
                
    }

}