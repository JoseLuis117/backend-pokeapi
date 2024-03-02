import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import UserDto from './dto/user.dto';
import { hash } from 'bcrypt';
@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }
    async create(data: UserDto) {
        const findUser = await this.prisma.user.findMany({
            where: {
                OR: [
                    { email: data.email },
                    { name: data.name }
                ]
            },
        });
        if (findUser) throw new Error('User already exists');
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
}
