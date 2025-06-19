import { IProfile } from "../../../interface/profile.interface";
import { IUser } from "../../../interface/user.interface";
import { Types } from "mongoose";
import userModel from "../../../models/user.model";
import { ProfileResponseDto } from "../dto/profile.dto";
import { getUserProfile } from "../user.service";
import NotFoundException from "../../../exceptions/notFound.exception";
import InternalServerErrorException from "../../../exceptions/internalServerError.exception";

jest.mock("../../../models/user.model")
jest.mock("../dto/profile.dto")

describe("getUserProfile", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return user profile", async () => {
        const mockUser: Partial<IUser> = {
            _id: new Types.ObjectId("507f1f77bcf86cd799439012"),
            user_id: "user_id",
            username: "mockSubject",
            email: "test@example.com",
            passwordHash: "hashedPassword",
            profile: {
                _id: new Types.ObjectId("507f1f77bcf86cd799439040"),
                first_name: "john",
                last_name: "doe",
                country: "nile",
                bio: "A test subject",
                user: new Types.ObjectId("507f1f77bcf86cd799439012")
            } as IProfile
        };

        (userModel.findOne as jest.Mock).mockReturnValue({
            populate: jest.fn().mockResolvedValue(mockUser),
        });
        
        const result = await getUserProfile("user_id");


        expect(userModel.findOne).toHaveBeenCalledWith({user_id: "user_id"});
        expect(result.success).toBe(true);
        expect(result.data).toEqual(new ProfileResponseDto(mockUser))
    })

    
    it("should throw NotFoundException if user is not found", async () => {
        (userModel.findOne as jest.Mock).mockReturnValue({
            populate: jest.fn().mockResolvedValue(null),
        });

        
       await expect(getUserProfile("non_existent_ID")).rejects.toThrow(NotFoundException);


    })

    it("should throw InternalServerErrorException upon DB error", async () => {
        (userModel.findOne as jest.Mock).mockImplementation(() => {
            throw new Error("Some database error");
        })

        await expect(getUserProfile("some_id")).rejects.toThrow(InternalServerErrorException);
    })
        
    })
