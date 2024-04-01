import { Module } from '@nestjs/common';
import { PokemonesService } from './pokemones.service';
import { PokemonesController } from './pokemones.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PokemonesService, PrismaService, JwtService],
  controllers: [PokemonesController]
})
export class PokemonesModule {}
