import { Controller, Get, UseGuards } from '@nestjs/common';
import { PokemonesService } from './pokemones.service';
import JwtGuard from 'src/auth/guards/jwt.guard';

@Controller('pokemones')
export class PokemonesController {
    constructor(private readonly pokemonesServices:PokemonesService) {}
    
    @Get('regiones')
    @UseGuards(JwtGuard)
    async getRegiones(){
        return this.pokemonesServices.getRegiones()
    }
}
