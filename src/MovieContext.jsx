import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { config, apiKey } from './global/globalVariables.js';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [reviews, setReviews] = useState([]);

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

    const fetchReview = async (id) => {
        try {
            const res = await axios.get(`https://localhost:7051/api/ReviewMovie/get-movie-review?movieId=${id}`);
            if (res.data && res.data.isSuccess && res.data.data) {
                setReviews(res.data.data);
            } else {
                setReviews([]);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setReviews([]);
            } else {
                console.error("Failed to fetch reviews:", error);
            }
        }
    };

    return (
        <MovieContext.Provider value={{ movies, setMovies, selectedMovie, setSelectedMovie, fetchMovies, reviews, fetchReview }}>
            {children}
        </MovieContext.Provider>
    )
};
