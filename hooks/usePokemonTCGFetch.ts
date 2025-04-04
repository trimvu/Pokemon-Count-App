import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const poke_url = "https://api.pokemontcg.io/v2/cards";
const api_key = process.env.EXPO_PUBLIC_API_KEY;

interface PokeData {
    cardImage: string;
    pokedexNumber: number | "N/A";
}

export default function usePokemonTCGFetch() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState<PokeData | null>(null);

    const fetchRandomCard = useCallback(async () => {
        try {
            let random = Math.floor(Math.random() * 15756);
            const response = await axios.get(`${poke_url}?pageSize=1&page=${random}&q=supertype:"Pokémon"`, {
                headers: {
                    'X-Api-Key': api_key,
                },
            });

            setResponse({
                cardImage: response.data.data?.[0]?.images?.large,
                pokedexNumber: response.data?.data?.[0]?.nationalPokedexNumbers?.[0] || "N/A",
            });
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRandomCard();
    }, []);

    return { isLoading, error, response, refetch: fetchRandomCard };
}