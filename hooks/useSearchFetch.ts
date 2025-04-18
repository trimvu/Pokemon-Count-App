import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const poke_url = "https://api.pokemontcg.io/v2/cards";
const api_key = process.env.EXPO_PUBLIC_API_KEY;

interface PokeData {
    cardImage: string;
    pokedexNumber: number | "N/A";
}

type Props = {
    page: number;
    searchTerm: string | string[];
}

export default function useSearchFetch({ page, searchTerm }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState<PokeData | null>(null);

    const fetchSearchResult = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${poke_url}?pageSize=10&page=${page}&q=supertype:"Pokémon" name:${searchTerm}`, {
                headers: {
                    'X-Api-Key': api_key,
                },
            });

            console.log(response.data);

            setResponse({
                cardImage: response.data.data?.[0]?.images?.large,
                pokedexNumber: response.data?.data?.[0]?.nationalPokedexNumbers?.[0] || "N/A",
            });
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchSearchResult();
    }, [page]);

    return { isLoading, error, response, refetch: fetchSearchResult };
}