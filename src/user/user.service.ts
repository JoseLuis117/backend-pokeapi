import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import UserDto from './dto/user.dto';
import { hash } from 'bcrypt';
import UpdateUserData from './dto/userUpdate.dto';
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
                password: await hash(password, 10)
            }
        });
        return rest;
    }
    async findUserByEmail(email:string) {
        const user = await this.prisma.user.findUnique({
            where: { email: email}
        });
        return user;
    }
    async findUserByName(name:string) {
        return this.prisma.user.findFirst({
            where: { name: name}
        });
    }
    async findUserById(id:string) {
        const user = await this.prisma.user.findUnique({
            where: { id: id},
            include: { pokemons: true }
        });
        const {password, ...rest} = user;
        return rest;
    }
    async updateUserData(data:UpdateUserData) {
        console.log("service")
        console.log(data);
        const user = await this.prisma.user.update({
            where: { id: data.id },
            data: {
                name: data.name? data.name : undefined,
                favouritePokemon: data.favouritePokemon? data.favouritePokemon : undefined,
                regionId: data.regionId? data.regionId : undefined,
                profilePicture: data.profilePicture? data.profilePicture : undefined,
                bannerPicture: data.bannerPicture? data.bannerPicture : undefined
            }
        });
        console.log(user);
        return user;
    }
}
