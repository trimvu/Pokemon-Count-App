import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const poke_url = "https://api.pokemontcg.io/v2/cards";
const api_key = process.env.EXPO_PUBLIC_API_KEY;

interface PokeData {
    images: {
        small: string;
    };
    id: string;
}

type Props = {
    page: number;
    searchTerm: string | string[];
}

export default function useSearchFetch({ page, searchTerm }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState<PokeData[] | null>(null);
    const [totalCount, setTotalCount] = useState<number | null>(null);
    const [fetchedPage, setFetchedPage] = useState<number | null>(null);

    const fetchSearchResult = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${poke_url}?pageSize=10&page=${page}&q=supertype:"Pokémon" name:*${searchTerm}*`, {
                headers: {
                    'X-Api-Key': api_key,
                },
            });

            // console.log(response.data.data);

            setResponse(response.data.data);

            setTotalCount(response.data.totalCount);

            setFetchedPage(page);
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsLoading(false);
        }
    }, [page, searchTerm]);

    useEffect(() => {
        fetchSearchResult();
    }, [page, searchTerm]);

    return { isLoading, error, response, totalCount, fetchedPage, refetch: fetchSearchResult };
}