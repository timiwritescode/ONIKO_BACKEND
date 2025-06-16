import * as userService from "../../user/user.service";
import * as utils from "../../../utils/password--hash.util";
import * as tokenUtil from "../../../utils/util";
import * as authService from "../service/auth.service";
import { SignInDto } from "../dto/signIn.dto";
import { SignInResponseDto } from "../dto/signInResponse.dto";
import { SignUpDto } from "../dto/signUp.dto";
import { SignUpResponseDto } from "../dto/signUpResponse.dto";
import { GeneralResponse } from "../../../dto/general-response.dto";
import { USER_CREATED_MESSAGE } from "../util/messages.util";



jest.mock("../../user/user.service");
jest.mock("../../../utils/password--hash.util");
jest.mock("../../../utils/util");


describe("signUpUser", () => {
  it("should hash password and create user", async () => {
    const dto: SignUpDto = {
      username: "Test User",
      email: "test@example.com",
      password: "plaintext",
    };

    (utils.hashPassword as jest.Mock).mockResolvedValue("plaintext");
    (userService.createUser as jest.Mock).mockResolvedValue({ user_id: "123" });

    const result = await authService.signUpUser(dto);
    const responseDto = new GeneralResponse(true, USER_CREATED_MESSAGE, new SignUpResponseDto("123"))
    expect(utils.hashPassword).toHaveBeenCalledWith("plaintext");
    expect(userService.createUser).toHaveBeenCalledWith({ ...dto});
    expect(result).toEqual(responseDto);
  });
});



describe("signInUser", () => {
  it("should authenticate and return token", async () => {
    const dto: SignInDto = {
      email: "test@example.com",
      password: "plaintext",
    };

    const mockUser = {
      user_id: "abc123",
      passwordHash: "hashed",
    };

    (userService.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    (utils.isPasswordMatch as jest.Mock).mockResolvedValue(true);
    (tokenUtil.generateAccessToken as jest.Mock).mockReturnValue("token");

    const result = await authService.signInUser(dto);

    expect(userService.getUserByEmail).toHaveBeenCalledWith("test@example.com");
    expect(utils.isPasswordMatch).toHaveBeenCalledWith("plaintext", "hashed");
    expect(tokenUtil.generateAccessToken).toHaveBeenCalledWith({ user_id: "abc123" });
    expect(result).toEqual(new SignInResponseDto("token"));
  });
});
