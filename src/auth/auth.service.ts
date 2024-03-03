import { Injectable, UnauthorizedException } from '@nestjs/common';
import UserDto from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import UserAuthDto from './dto/user.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService,private readonly jwtService: JwtService) {}
    async register(data: UserDto) {
        return this.userService.create(data);
    }

    async login(data:UserAuthDto){
        const user = await this.validateUser(data);
        if (!user) {
            throw new UnauthorizedException('Credenciales invalidas');
        }
        const payload = {
            email: user.email,
            subset:{
                name: user.name,
                id: user.id
            }
        }
        return {
            user,
            backend_tokens: {
                access_token: await this.jwtService.signAsync(payload,{
                    secret: process.env.jwtSecretTokenKey,
                    expiresIn: '1h'
                }),
                refresh_token: await this.jwtService.signAsync(payload,{
                    secret: process.env.jwtRefreshToken,
                    expiresIn: '7d'
                })
            }
        }
    }
    async refreshToken(data:any){
        const payload = {
            email: data.email,
            subset:data.subset
        }
        return {
            backend_tokens: {
                access_token: await this.jwtService.signAsync(payload,{
                    secret: process.env.jwtSecretTokenKey,
                    expiresIn: '1h'
                }),
                refresh_token: await this.jwtService.signAsync(payload,{
                    secret: process.env.jwtRefreshToken,
                    expiresIn: '7d'
                })
            }
        }
    }
    async validateUser(data:UserAuthDto) {
        const loginByName = data.name? await this.userService.findUserByName(data.name):null;
        const loginByEmail = data.email? await this.userService.findUserByEmail(data.email): null;
        const user = loginByName || loginByEmail;
        if (user && compare(data.password, user.password)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
