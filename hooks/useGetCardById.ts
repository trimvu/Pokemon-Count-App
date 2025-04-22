import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const poke_url = "https://api.pokemontcg.io/v2/cards";
const api_key = process.env.EXPO_PUBLIC_API_KEY;

interface PokeData {
    cardImage: string;
    name: string;
    artist: string;
}

// interface Evolution {
//     evolvesTo: string;
//     evolvesFrom: string;
// }

type Props = {
    cardId: string | string[];
}

export default function useGetCardById({ cardId }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState<PokeData | null>(null);
    const [evolvesFrom, setEvolvesFrom] = useState<string>();
    const [evolvesTo, setEvolvesTo] = useState<string[] | null>(null);
    const [pokedexNumbers, setPokedexNumbers] = useState<number[] | null>(null);

    const fetchCard = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${poke_url}/${cardId}`, {
                headers: {
                    'X-Api-Key': api_key,
                },
            });

            // console.log(response.data.data);

            setResponse({
                cardImage: response.data.data?.images?.large,
                name: response.data.data?.name,
                artist: response.data.data?.artist,
            });

            setEvolvesFrom(response.data.data?.evolvesFrom);
            setEvolvesTo(response.data.data?.evolvesTo);
            setPokedexNumbers(response.data.data?.nationalPokedexNumbers);
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCard();
    }, []);

    return { isLoading, error, response, evolvesFrom, evolvesTo, pokedexNumbers };
}