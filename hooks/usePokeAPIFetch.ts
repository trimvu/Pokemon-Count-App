import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function usePokeAPIFetch(pokedexNumber?: number | "N/A") {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState<any>(null);

    const fetchSprite = useCallback(async () => {
        try {
            if (!pokedexNumber) return;

            if (pokedexNumber === 'N/A') {
                const response = await axios.get(`https://pokeapi.co/api/v2/item/4/`)
                setResponse(response.data?.sprites?.default);
            } else {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokedexNumber}`)
                setResponse(response.data?.sprites?.front_default)
            }
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsLoading(false);
        }
    }, [pokedexNumber]);

    useEffect(() => {
        fetchSprite();
    }, [pokedexNumber]);

    return { isLoading, error, response };
}