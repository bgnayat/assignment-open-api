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
}
