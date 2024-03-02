import { IsString } from "class-validator";

export default class UserDto{
    @IsString()
    name: string;
    @IsString()
    email: string;
    @IsString()
    password: string;
}