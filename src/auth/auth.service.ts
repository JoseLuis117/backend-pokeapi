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

    async login(data: UserAuthDto) {
        const user = await this.validateUser(data);
        const payload={
            name:user.name,
            sub:{
                email:user.email,
            }
        }
        return{
            user,
            backendTokens:{
                accessToken:await this.jwtService.signAsync(payload,{
                    expiresIn:'1h',
                    secret:process.env.jwtSecretTokenKey
                }),
                refreshToken: await this.jwtService.signAsync(payload,{
                    expiresIn:'7d',
                    secret:process.env.jwtRefreshToken
                }),
            }
        }
    }

    async validateUser(loginData: UserAuthDto) {
        const user = await this.userService.findUserByEmail(loginData.email);
        if (user && await compare(loginData.password, user.password)){
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }
    async refreshToken(user:any){
        const payload={
            name:user.name,
            sub:user.sub
        }
        return {
            backendTokens:{
                accessToken:await this.jwtService.signAsync(payload,{
                    expiresIn:'1h',
                    secret:process.env.jwtSecretTokenKey
                }),
                refreshToken: await this.jwtService.signAsync(payload,{
                    expiresIn:'7d',
                    secret:process.env.jwtRefreshToken
                }),
            }
        }
    }
}
