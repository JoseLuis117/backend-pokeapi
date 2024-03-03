import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import JwtGuard from 'src/auth/guards/jwt.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService, private readonly authService:AuthService) {}
    @UseGuards(JwtGuard)
    @Post(':name')
    async getUserById(@Param('name') name:string){
        return this.userService.findUserByName(name);
    }
}
