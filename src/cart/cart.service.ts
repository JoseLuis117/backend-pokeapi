import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddPokemonDto } from './dto/addPokemon.dto';

@Injectable()
export class CartService {
    constructor(private readonly prismaService: PrismaService) { }

    async addNewPokemon(pokemonData: AddPokemonDto, userId: string) {
        const exist = await this.prismaService.cart.findFirst({
            where: {
                userId: userId
            }
        })
        if (!exist) {
            const newCart = await this.prismaService.cart.create({
                data: {
                    userId: userId
                }
            })
        }
        const getTypesPromises = pokemonData.types.map(async (type) => {
            const foundType = await this.prismaService.types.findFirst({
                where: {
                    nombre: type.nombre
                }
            });
            return foundType;
        });
        const resolvedTypes = await Promise.all(getTypesPromises);
        const insertNewCart = await this.prismaService.cart.update({
            where: {
                userId: userId
            },
            data: {
                pokemons: {
                    create: {
                        nombre: pokemonData.nombre,
                        userId: userId,
                        types: {
                            connect: resolvedTypes.map(value => ({ id: value.id }))
                        },
                        xp: pokemonData.xp,
                        hp: pokemonData.hp,
                        attack: pokemonData.attack,
                        defense: pokemonData.defense,
                        specialAttack: pokemonData.specialAttack,
                        specialDefense: pokemonData.specialDefense,
                        speed: pokemonData.speed,
                        imageUrl: pokemonData.imageUrl,
                        isOwnedByUser:false
                    }
                }
            }
        })
        return insertNewCart;
    }
    async getCartData(userId: string) {
        const getData = await this.prismaService.cart.findMany({
            where: {
                userId: userId,
            },
            select: {
                pokemons: {
                    select: {
                        types: true,
                        xp: true,
                        attack: true,
                        defense: true,
                        cartId: true,
                        hp: true,
                        imageUrl: true,
                        id: true,
                        nombre: true,
                        specialAttack: true,
                        specialDefense: true,
                        speed: true,
                    }
                }
            }
        })
        return getData[0]['pokemons']
    }

    async deletePokemon(pokemonId: number) {

        const deletePokemon = await this.prismaService.pokemon.delete({ where: { id: pokemonId } })
        console.log("Delete pokemon");
        console.log(deletePokemon);

        return deletePokemon;
    }
    async buyPokemons(ids: number[], userId: string, pokeCoins:number) {
        console.log("service")
        console.log(ids)
        console.log(userId);
        if (!ids) {
            return
        }
        if(pokeCoins < ids.length){
            return;
        }else{
            const {pokeCoins} = await this.prismaService.user.findFirst({
                where:{
                    id:userId
                },
                select:{
                    pokeCoins:true
                }
            })
            const updateUserPC = await this.prismaService.user.update({
                where:{
                    id:userId
                },
                data:{
                    pokeCoins:pokeCoins-ids.length
                }
            })
            console.log("PokeCoins Restado")
            console.log(updateUserPC);
        }
        const pokemonInfo = ids.map(async (value) => {
            const data = await this.prismaService.pokemon.findFirst({
                where: { id: value },
                select: {
                    types: true,
                    xp: true,
                    attack: true,
                    defense: true,
                    cartId: true,
                    hp: true,
                    imageUrl: true,
                    id: true,
                    nombre: true,
                    specialAttack: true,
                    specialDefense: true,
                    speed: true,
                }
            })
            return data;
        })
        const resolve = await Promise.all(pokemonInfo);
        console.log("Resolve")
        console.log(resolve);

        const getTypesPromises = resolve.map(async (details) => {
            const getTypes = details.types.map(async (type) => {
                const foundType = await this.prismaService.types.findFirst({
                    where: {
                        nombre: type.nombre
                    }
                });
                return foundType;
            });
            const resolvedTypes = await Promise.all(getTypes)
            return resolvedTypes;
        })
        console.log(getTypesPromises);
        const resolveTypesPromise = await Promise.all(getTypesPromises);
        console.log(resolveTypesPromise);

        const newPokemon = resolve.map(async (value, index) => {
            const addPokemon = await this.prismaService.user.update({
                where: {
                    id: userId
                },
                data: {
                    pokemons: {
                        create: {
                            nombre: value.nombre,
                            attack: value.attack,
                            defense: value.defense,
                            hp: value.hp,
                            imageUrl: value.imageUrl,
                            specialAttack: value.specialAttack,
                            specialDefense: value.specialDefense,
                            speed: value.speed,
                            xp: value.xp,
                            types: {
                                connect: resolveTypesPromise[index].map(value => ({ id: value.id }))
                            },
                            isOwnedByUser:true
                        }
                    }
                }
            })
            console.log(addPokemon)
            return addPokemon
        })
        const rpNewPokemon = await Promise.all(newPokemon);
        console.log("News pokemons");
        console.log(rpNewPokemon);
        const deleteManyPokemons = resolve.map(async(value,index)=>{
            const deletePokemon = await this.prismaService.pokemon.delete({ where: { id: value.id } })
            return deleteManyPokemons;
        })
        console.log("Delete many")
        const resolveDeleteMany = await Promise.all(deleteManyPokemons);
        console.log(resolveDeleteMany);
        return rpNewPokemon;
    }
}
