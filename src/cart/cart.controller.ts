import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import JwtGuard from 'src/auth/guards/jwt.guard';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService:CartService){}
    @UseGuards(JwtGuard)
    @Post('add_new_pokemon')
    async addNewPokemon(@Body('pokemonData') pokemonData, @Body('userId') userId){
        const data = await this.cartService.addNewPokemon(pokemonData,userId);
        return data;
    }

    @UseGuards(JwtGuard)
    @Get('get-cart-data')
    async getCartData(@Request() req){
        const userId = req.user.subset.id;
        return this.cartService.getCartData(userId);
    }

    @UseGuards(JwtGuard)
    @Post('delete-pokemon')
    async deletePokemon(@Body('id') pokemonId, @Request() data){
        console.log(data.user)
        const userId = data.user.subset.id;
        console.log("Desde service");
        return this.cartService.deletePokemon(pokemonId)
    }

    @UseGuards(JwtGuard)
    @Post('buy-pokemons')
    async buyPokemons(@Body('ids') ids, @Body('pokeCoins') pokeCoins, @Request() data){
        const userId = data.user.subset.id;
        console.log("Desde controller ids")
        console.log(ids)
        return this.cartService.buyPokemons(ids, userId, pokeCoins);
    }
}
