import { Controller, Get, Query, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    // Endpoint to get a list of Pokémon
    @Get('list')
    async getPokemonList(
        @Query('limit') limit = 20,
        @Query('offset') offset = 0,
    ) {
        return this.pokemonService.getPokemonList(Number(limit), Number(offset));
    }

    // Endpoint to get Pokémon details
    @Get(':nameOrId')
    async getPokemonDetails(@Param('nameOrId') nameOrId: string) {
        return this.pokemonService.getPokemonDetails(nameOrId);
    }

    // Endpoint to get Pokémon by type
    @Get('type/:type')
    async getPokemonByType(@Param('type') type: string) {
        return this.pokemonService.getPokemonByType(type);
    }

    // Endpoint to compare two Pokémon
    @Get('compare/:pokemon1/:pokemon2')
    async comparePokemon(
        @Param('pokemon1') pokemon1: string,
        @Param('pokemon2') pokemon2: string,
    ) {
        return this.pokemonService.comparePokemon(pokemon1, pokemon2);
    }

    // Endpoint to get Pokémon evolution chain
    @Get('evolution-chain/:nameOrId')
    async getPokemonEvolutionChain(@Param('nameOrId') nameOrId: string) {
        return this.pokemonService.getPokemonEvolutionChain(nameOrId);
    }

}
