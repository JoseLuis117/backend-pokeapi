import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import JwtGuard from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService, private readonly authService:AuthService) {}
    @Post(':id')
    @UseGuards(JwtGuard)
    async getUser(@Param('id') id:string){
        return this.userService.findUserById(id);	
    }

/*     @Get()
    @UseGuards(JwtGuard)
    async getUserByEmail(@Body() email:string){
        return this.userService.findUserByEmail(email);
    } */
}
