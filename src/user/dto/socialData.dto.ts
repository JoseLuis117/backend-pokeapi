import { IsOptional, IsString } from "class-validator"

export class SocialDataDto{
    @IsOptional()
    @IsString()
    facebook?:string

    @IsOptional()
    @IsString()
    instagram?:string

    @IsOptional()
    @IsString()
    twitter?:string

    @IsString()
    userId:string
}