import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function usePokeAPIFetch(pokedexNumber?: string | number | null | "N/A") {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [pokeName, setPokeName] = useState<string | null>(null);

    const fetchSprite = useCallback(async () => {
        try {
            setIsLoading(true);
            if (!pokedexNumber) return;

            if (pokedexNumber === 'N/A') {
                const response = await axios.get(`https://pokeapi.co/api/v2/item/4/`)
                setResponse(response.data?.sprites?.default);
            } else {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokedexNumber}`)
                setResponse(response.data?.sprites?.front_default)
                setPokeName(response.data?.name);
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

    return { isLoading, error, response, pokeName };
}