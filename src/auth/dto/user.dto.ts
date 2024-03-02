import { IsString } from "class-validator";

export default class UserAuthDto{
    @IsString()
    email: string;
    @IsString()
    password: string;
}