import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PokemonesService {
    constructor(private readonly prismaService: PrismaService) {}
    async getRegiones(){
        const regions = this.prismaService.regiones.findMany()
        console.log('Regiones')
        console.log(await regions);
        return regions;
    }
}
