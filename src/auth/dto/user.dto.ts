import { IsOptional, IsString } from "class-validator";

export default class UserAuthDto{
    @IsOptional()
    @IsString()
    email?: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    name?:string;
}