import request from "supertest";
import express from "express";

jest.mock("../service/auth.service");
import * as authService from "../service/auth.service"
import { bootstrapExpress } from "../../../loader/app";
import { SignUpResponseDto } from "../dto/signUpResponse.dto";
import { SignInResponseDto } from "../dto/signInResponse.dto";
import { GeneralResponse } from "../../../dto/general-response.dto";
import { USER_CREATED_MESSAGE } from "../util/messages.util";



let app = express()
bootstrapExpress(app);

describe("POST /api/v1/auth/sign-up", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return user created", async() => {
        const mockResponse = new GeneralResponse(
            true, 
            USER_CREATED_MESSAGE,
            new SignUpResponseDto("user_id")
        ) 
        
        const user = {
            username: "Oniaska",
            email: "onwaiska@examplemail.com",
            password: "password123",
        };

        (authService.signUpUser as jest.Mock).mockResolvedValue(mockResponse)
        
        const response = await request(app)
                                .post("/api/v1/auth/sign-up")
                                .send(user)
                                .expect(201);
        
        expect(response.body.data.user_id).toBe("user_id");
        expect(authService.signUpUser).toHaveBeenCalledWith(user);
    })

    
})


describe ("POST /api/v1/auth/sign-up", () => {
    it ("should respond with validation error when fields violates schema", async () => {
        const invalidUser = {
            name: "",
            email: "invalid-email",
            password: "pass"
        };

        const response = await request(app)
                                .post("/api/v1/auth/sign-up")
                                .send(invalidUser);


        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false)
        
    })
})


describe ("POST /api/v1/auth/sign-in", () => {
    it("should respond with access token", async () => {
        const mockAccessToken = "mocked.jwt.token";

        const mockSignUpResponse = new SignUpResponseDto("user_id");

        const mockSignInResponse = new SignInResponseDto(mockAccessToken);

        
        const newUser = {
            username: "mock_user",
            email: "mock@email.com",
            password: "password"
        };

        const loginCreds = {
            email: newUser.email,
            password: newUser.password
        };

        (authService.signUpUser as jest.Mock).mockResolvedValue(mockSignUpResponse);
        (authService.signInUser as jest.Mock).mockResolvedValue(mockSignInResponse);

        const signUpResponse = await request(app)
                                        .post("/api/v1/auth/sign-up")
                                        .send(newUser);

        expect(signUpResponse.status).toBe(201);



        const signInResponse = await request(app)
                                        .post("/api/v1/auth/sign-in")
                                        .send(loginCreds);
        const body = signInResponse.body;

        expect(signInResponse.status).toBe(200);
        expect(body.accessToken).toBeDefined()
        expect(body.success).toBe(true);


        expect(authService.signUpUser).toHaveBeenCalledWith(newUser);
        expect(authService.signInUser).toHaveBeenCalledWith(loginCreds);
    })
})