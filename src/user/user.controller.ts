import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import JwtGuard from 'src/auth/guards/jwt.guard';
import UpdateUserData from './dto/userUpdate.dto';
import { SocialDataDto } from './dto/socialData.dto';

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
    @Patch('update')
    @UseGuards(JwtGuard)
    async updateUser(@Body() data:UpdateUserData){
        return this.userService.updateUserData(data);
    }

    @Patch('create-social-networks')
    @UseGuards(JwtGuard)
    async createSocialNetworks(@Body('userId') userId:string){
        return this.userService.createSocialNetworks(userId);
    }

    @Patch('update-social-networks')
    @UseGuards(JwtGuard)
    async updateSocialNetworks(@Body('socialData') socialData:SocialDataDto){
        return this.userService.updateSocialNetowkrs(socialData);
    }
}
