import axios from "axios";
import { config } from "./utils/axiosConfig";

export const fetchMoviesList = async (pageNumber) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_MOVIE_API_BASE_URL}/3/discover/movie?language=${process.env.REACT_APP_MOVIE_API_LANGUAGE}&page=${pageNumber}`,
            config);
        return response;
    } catch (error) {
        return error;
    }
}

export const searchMoviesList = async (searchText, pageNumber) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_MOVIE_API_BASE_URL}/3/search/movie?query=${searchText}&language=${process.env.REACT_APP_MOVIE_API_LANGUAGE}&page=${pageNumber}`,
            config
        );
        return response;
    } catch (error) {
        return error;
    }
}

export const fetchMovieDetail = async (movieId) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_MOVIE_API_BASE_URL}/3/movie/${movieId}?language=${process.env.REACT_APP_MOVIE_API_LANGUAGE}`,
            config
        );
        return response;
    } catch (error) {
        return error;
    }
}

export const fetchMovieReviews = async (movieId) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_REVIEW_API_BASE_URL}/movies/${movieId}/reviews`);
        return response;
    } catch (error) {
        return error;
    }
}

export const fetchMovieImages = async (movieId) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_MOVIE_API_BASE_URL}/3/movie/${movieId}/images`, config);
        return response;
    } catch (error) {
        return error;
    }
}

export const submitMovieReview = async (movieId, data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_REVIEW_API_BASE_URL}/movies/${movieId}/reviews`, data);
        return response;
    } catch (error) {
        return error;
    }
}

export const fetchSimilarMoviesList = async (movieId, pageNumber) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_MOVIE_API_BASE_URL}/3/movie/${movieId}/similar?language=${process.env.REACT_APP_MOVIE_API_LANGUAGE}&page=${pageNumber}`,
            config
        );
        return response;
    } catch (error) {
        return error;
    }
}