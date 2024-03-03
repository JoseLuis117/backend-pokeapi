import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import UserDto from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import RefreshGuard from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService:UserService, private readonly authService:AuthService) {}
    @Post('register')
    async register(@Body() userData: UserDto){
        console.log(await this.userService.create(userData))
        return this.userService.create(userData);
    }
    @Post('login')
    async login(@Body() userData: UserDto){
        return this.authService.login(userData);
    }
    @UseGuards(RefreshGuard)
    @Post('refresh')
    async refresh(@Request() req){
        console.log(req.user)
        return this.authService.refreshToken(req.user);
    }
}
