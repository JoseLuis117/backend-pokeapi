import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import UserDto from './dto/user.dto';
import { hash } from 'bcrypt';
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
        return this.prisma.user.findUnique({
            where: { email: email}
        });
    }
    async findUserByName(name:string) {
        return this.prisma.user.findFirst({
            where: { name: name}
        });
    }
    async findUserById(id:string) {
        return this.prisma.user.findUnique({
            where: { id: id}
        });
    }
}
