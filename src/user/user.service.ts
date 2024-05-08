import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import UserDto from './dto/user.dto';
import { hash } from 'bcrypt';
import UpdateUserData from './dto/userUpdate.dto';
import { SocialDataDto } from './dto/socialData.dto';
@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }
    async create(data: UserDto) {
        const findUserByEmail = await this.findUserByEmail(data.email);
        if (findUserByEmail) return { error: 'El email ya esta registrado' };
        const findUserByName = await this.findUserByName(data.name);
        if (findUserByName) return { error: 'El nombre de usuario ya esta registrado' };
        const { password, ...rest } = data;

        await this.prisma.user.create({
            data: {
                ...rest,
                password: await hash(password, 10),
                pokeCoins: 0
            }
        });
        return rest;
    }
    async findUserByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email: email }
        });
        return user;
    }
    async findUserByName(name: string) {
        return this.prisma.user.findFirst({
            where: { name: name }
        });
    }
    async findUserById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: id },
            include: {
                pokemons: {
                    where: {
                        isOwnedByUser: true
                    }
                },
                socialNetworks: true
            }
        });
        console.log(user.socialNetworks);
        const { password, ...rest } = user;
        return rest;
    }
    async updateUserData(data: UpdateUserData) {
        console.log("service")
        console.log(data);
        const user = await this.prisma.user.update({
            where: { id: data.id },
            data: {
                name: data.name ? data.name : undefined,
                favouritePokemon: data.favouritePokemon ? data.favouritePokemon : undefined,
                regionId: data.regionId ? data.regionId : undefined,
                profilePicture: data.profilePicture ? data.profilePicture : undefined,
                bannerPicture: data.bannerPicture ? data.bannerPicture : undefined
            }
        });
        console.log(user);
        return user;
    }

    async createSocialNetworks(userId: string) {
        const names = ['facebook', 'twitter', 'instagram'];
        const initialData = names.map(nombre => ({ name: nombre, userId }));
        const create = this.prisma.socialNetwork.createMany({
            data: initialData
        })
        console.log("Social Network Initial Data");
        console.log(create);
        return create;
    }
    async updateSocialNetowkrs(socialData: SocialDataDto) {
        const id = await this.prisma.socialNetwork.findMany({
            where: {
                userId: socialData.userId
            },
            select: {
                id: true,
                name: true
            }
        });
        console.log("Claves")
        const claves = Object.keys(socialData);
        console.log("Consulta ids")
        console.log(id)
        id.map(async (socialNetwork, index) => {
            const update = await this.prisma.socialNetwork.update({
                where: {
                    id: socialNetwork.id,
                    name: socialNetwork.name
                },
                data: {
                    url: socialData[socialNetwork.name]
                }
            })
            console.log(update);
        })
        return { status: 200 }
    }
    async getPokeCoins(userId: string) {
        return this.prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                pokeCoins: true
            }
        })
    }
    async getPokemons(userId: string) {
        const pokemons = await this.prisma.user.findFirst({
            where: {
                id: userId
            },
            include: {
                pokemons: {
                    where: {
                        isOwnedByUser: true
                    },
                    include: {
                        types: true
                    }
                }
            }
        })
        console.log(pokemons.pokemons)
        return pokemons.pokemons;
    }
}
