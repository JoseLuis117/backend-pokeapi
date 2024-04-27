import { Transform, Type } from "class-transformer";
import { IsInt, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export default class UpdateUserData {
    @IsString()
    id: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    favouritePokemon?: string;

    @Type(() => Number)
    @IsNumber()
    readonly regionId?: number;

    @IsString()
    @IsOptional()
    profilePicture?: string;

    @IsString()
    @IsOptional()
    bannerPicture?: string;
}