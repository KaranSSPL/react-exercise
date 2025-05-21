import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { config } from '../global/globalVariables.js';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [foundSearchResult, setFoundSearchResult] = useState(false);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async (pageNumber = 1) => {
        setLoader(true);
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_MOVIE_API_BASE_URL}/${process.env.REACT_APP_MOVIE_API_VERSION}/discover/movie?language=${process.env.REACT_APP_MOVIE_API_LANGUAGE}&page=${pageNumber}&api_key=${process.env.REACT_APP_MOVIE_API_KEY}`,
                config
            );
            setFoundSearchResult(false);
            setMovies(response.data.results);
            setPage(response.data.total_pages);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoader(false);
        }
    };

    const searchMovies = async (pageNumber = 1) => {
        setLoader(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_MOVIE_API_BASE_URL}/${process.env.REACT_APP_MOVIE_API_VERSION}/search/movie?query=${search}&language=${process.env.REACT_APP_MOVIE_API_LANGUAGE}&page=${pageNumber}`, config);
            setPage(response.data.total_pages);
            if (response.data.results <= 0) {
                setFoundSearchResult(true);
            } else {
                setFoundSearchResult(false);
                setMovies(response.data.results);
            }
        } catch (error) {
            console.error('Error while searching movie:', error);
        } finally {
            setLoader(false);
        }
    }

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
        <MovieContext.Provider value={{ movies, setMovies, selectedMovie, setSelectedMovie, fetchMovies, reviews, fetchReview, page, searchMovies, search, setSearch, foundSearchResult, loader, setLoader }}>
            {children}
        </MovieContext.Provider>
    )
};
