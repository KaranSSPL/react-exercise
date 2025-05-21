import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [foundSearchResult, setFoundSearchResult] = useState(false);
    const [loader, setLoader] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        fetchMovies();
        setSearch("");
    }, []);

    const config = {
        headers: {
            Authorization: process.env.REACT_APP_MOVIE_TOKEN
        }
    };

    const fetchMovies = async (pageNumber = 1) => {
        setLoader(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_MOVIE_API_BASE_URL}/${process.env.REACT_APP_MOVIE_API_VERSION}/discover/movie?language=${process.env.REACT_APP_MOVIE_API_LANGUAGE}&page=${pageNumber}`, config);
            setFoundSearchResult(false);
            setPageNumber(response.data.page);
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
        setPage(0);
        try {
            const response = await axios.get(`${process.env.REACT_APP_MOVIE_API_BASE_URL}/${process.env.REACT_APP_MOVIE_API_VERSION}/search/movie?query=${search}&language=${process.env.REACT_APP_MOVIE_API_LANGUAGE}&page=${pageNumber}`, config);
            setPageNumber(response.data.page);
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
            const res = await axios.get(`${process.env.REACT_APP_REVIEW_API_BASE_URL}/ReviewMovie/get-movie-review?movieId=${id}`);
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
        <MovieContext.Provider value={{ movies, setMovies, selectedMovie, setSelectedMovie, fetchMovies, reviews, fetchReview, page, searchMovies, search, setSearch, foundSearchResult, loader, setLoader, pageNumber, setPageNumber }}>
            {children}
        </MovieContext.Provider>
    )
};
