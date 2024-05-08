import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator"

interface types{
    nombre:string
}
export class AddPokemonDto{
    @IsString()
    nombre:string

    @IsArray()
    types:types[]

    @IsNumber()
    hp:number

    @IsNumber()
    attack:number

    @IsNumber()
    defense:number

    @IsNumber()
    specialAttack:number

    @IsNumber()
    specialDefense:number

    @IsNumber()
    speed:number

    @IsNumber()
    xp:number

    @IsBoolean()
    isOwnedByUser:Boolean

    @IsString()
    imageUrl:string
}