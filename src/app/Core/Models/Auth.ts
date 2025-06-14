import { BaseDto } from "./base";

export interface LoginDto {
    email: string;
    password: string;
}

export interface LoginResponseDto extends BaseDto {
    fullName: string;
    email: string;
    accessToken: string;
}

export interface RegisterDto {
    fullName: string;
    email: string;
    password: string;
}



export interface SendOtpRequest {

    email?: string;

}


export interface VerifyOtpRequest {

    email: string;
    otp: string;
}

export interface OtpResponse {

    isAlreadyExist: boolean;
}

export interface UserDto {
    fullName: string;
    email: string;
    birthDate: string;
    phoneNumber: string;
}