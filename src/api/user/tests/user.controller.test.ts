import { bootstrapExpress } from "../../../loader/app";
import { getUserProfile } from "../user.service"
import {verifyToken} from "../../../middleware/verifyToken.middleware"
import express, { NextFunction, Request, Response } from "express";
import request from "supertest";

// mock the service
jest.mock("../user.service", () => ({
    getUserProfile: jest.fn()
})
)

// mock middle ware
jest.mock("../../../middleware/verifyToken.middleware", () => ({
    verifyToken: (req: Request, res: Response, next: NextFunction) => {
        req["user"] = {user_id: "mock_user_ID"};
        next(); 
    }
})
)


const mockedGetUserProfile = getUserProfile as jest.Mock;

const app = express()
bootstrapExpress(app);

describe("GET /api/v1/user/profile", () => {

    it("should return user profile upon success if token vaild", async () => {  
    const mock_user_ID = "mock_user_ID";
    const mockProfileResponse = {
      success: true,
      message: "Profile retrieved successfully",
      data: {
        user: {
          user_id: mock_user_ID,
          email: "test@example.com",
          username: "testuser"
        },
        first_name: "John",
        last_name: "Doe",
        country: "NG",
        bio: "Test bio"
      }
    };

    mockedGetUserProfile.mockResolvedValue(mockProfileResponse);

    const token = "access_token";
    const response = await request(app)
                            .get("/api/v1/user/profile")
                            .set("Authorization", `Bearer ${token}`)
                            
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProfileResponse);
    expect(getUserProfile).toHaveBeenCalledWith(mock_user_ID)
    })
})

