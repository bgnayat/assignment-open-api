import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PokemonService {
    private readonly baseUrl = 'https://pokeapi.co/api/v2';

    // Get a list of Pokémon
    async getPokemonList(limit: number, offset: number) {
        try {
            const response = await axios.get(`${this.baseUrl}/pokemon`, {
                params: { limit, offset },
            });
            return response.data;
        } catch (error) {
            throw new HttpException('Failed to fetch Pokémon list', HttpStatus.BAD_REQUEST);
        }
    }

    // Get details of a specific Pokémon
    async getPokemonDetails(nameOrId: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/pokemon/${nameOrId}`);
            return response.data;
        } catch (error) {
            throw new HttpException('Pokémon not found', HttpStatus.NOT_FOUND);
        }
    }

    // Get Pokémon by type
    async getPokemonByType(type: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/type/${type}`);
            return response.data;
        } catch (error) {
            throw new HttpException('Failed to fetch Pokémon by type', HttpStatus.BAD_REQUEST);
        }
    }

    // Compare stats of two Pokémon
    async comparePokemon(pokemon1: string, pokemon2: string) {
        try {
            const details1 = await this.getPokemonDetails(pokemon1);
            const details2 = await this.getPokemonDetails(pokemon2);

            const statsComparison = details1.stats.map((stat, index) => {
                const statName = stat.stat.name;
                const stat1Value = stat.base_stat;
                const stat2Value = details2.stats[index].base_stat;

                return {
                    stat: statName,
                    [pokemon1]: stat1Value,
                    [pokemon2]: stat2Value,
                    winner: stat1Value > stat2Value ? pokemon1 : stat2Value > stat1Value ? pokemon2 : 'tie',
                };
            });

            return {
                pokemon1: { name: details1.name, stats: details1.stats },
                pokemon2: { name: details2.name, stats: details2.stats },
                comparison: statsComparison,
            };
        } catch (error) {
            throw new HttpException(
                'Failed to compare Pokémon. Ensure both names or IDs are correct.',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
