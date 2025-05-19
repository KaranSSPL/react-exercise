import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { config, apiKey } from './global/globalVariables.js';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async (pageNumber = 1) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${pageNumber}&api_key=${apiKey}`,
                config
            );
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    return (
        <MovieContext.Provider value={{ movies, setMovies, selectedMovie, setSelectedMovie, fetchMovies }}>
            {children}
        </MovieContext.Provider>
    )
};
