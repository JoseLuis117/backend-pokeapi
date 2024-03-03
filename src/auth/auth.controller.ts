import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import UserDto from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import UserAuthDto from './dto/user.dto';
import JwtRefreshGuard from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService:UserService, private readonly authService:AuthService) {}
    @Post('register')
    async register(@Body() userData: UserDto){
        console.log(await this.userService.create(userData))
        return this.userService.create(userData);
    }
    @Post('login')
    async login(@Body() userData: UserAuthDto){
        return this.authService.login(userData);
    }
    @UseGuards(JwtRefreshGuard)
    @Post('refresh-token')
    async refreshToken(@Request() userData: any){
        return this.authService.refreshToken(userData);
    }
}
