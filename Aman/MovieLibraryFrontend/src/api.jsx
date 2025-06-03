import axios from "axios";
import { config } from "./utils/axiosConfig";

export const fetchMediaList = async (mediaType = "movie", page = 1, genreId = null) => {
    try {
        const genreParam = genreId ? `&with_genres=${genreId}` : "";
        const response = await axios.get(
            `${import.meta.env.VITE_APP_MOVIE_API_BASE_URL}/3/discover/${mediaType}?language=${import.meta.env.VITE_APP_MOVIE_API_LANGUAGE}&page=${page}${genreParam}`,
            config);
        return response;
    } catch (error) {
        return error;
    }
}

export const searchMediaList = async (mediaType = "movie", query, page) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_APP_MOVIE_API_BASE_URL}/3/search/${mediaType}?query=${query}&language=${import.meta.env.VITE_APP_MOVIE_API_LANGUAGE}&page=${page}`,
            config
        );
        return response;
    } catch (error) {
        return error;
    }
}

export const fetchMediaDetail = async (mediaType = "movie", movieId) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_APP_MOVIE_API_BASE_URL}/3/${mediaType}/${movieId}?language=${import.meta.env.VITE_APP_MOVIE_API_LANGUAGE}`,
            config
        );
        return response;
    } catch (error) {
        return error;
    }
}

export const fetchMediaTrailer = async (mediaType = "movie", movieId) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_APP_MOVIE_API_BASE_URL}/3/${mediaType}/${movieId}/videos?language=${import.meta.env.VITE_APP_MOVIE_API_LANGUAGE}`,
            config
        );
        return response;
    } catch (error) {
        return error;
    }
}

export const fetchMediaReviews = async (mediaType = "movie", movieId) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_REVIEW_API_BASE_URL}/${mediaType}/${movieId}/reviews`);
        return response;
    } catch (error) {
        return error;
    }
}

export const fetchMediaImages = async (mediaType = "movie", movieId) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_MOVIE_API_BASE_URL}/3/${mediaType}/${movieId}/images`, config);
        return response;
    } catch (error) {
        return error;
    }
}

export const submitMediaReview = async (mediaType = "movie", movieId, data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_REVIEW_API_BASE_URL}/${mediaType}/${movieId}/reviews`, data);
        return response;
    } catch (error) {
        return error;
    }
}

export const fetchSimilarMediaList = async (mediaType = "movie", movieId, page) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_APP_MOVIE_API_BASE_URL}/3/${mediaType}/${movieId}/similar?language=${import.meta.env.VITE_APP_MOVIE_API_LANGUAGE}&page=${page}`,
            config
        );
        return response;
    } catch (error) {
        return error;
    }
}

export const fetchGenreListOfMedia = async (mediaType = "movie") => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_APP_MOVIE_API_BASE_URL}/3/genre/${mediaType}/list?language=${import.meta.env.VITE_APP_MOVIE_API_LANGUAGE}`,
            config
        );
        return response;
    } catch (error) {
        return error;
    }
}

export const fetchSortByListOfMedia = async (mediaType, sortBy, page) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_APP_MOVIE_API_BASE_URL}/3/${mediaType}/${sortBy}?language=${import.meta.env.VITE_APP_MOVIE_API_LANGUAGE}&page=${page}`,
            config
        );
        return response;
    } catch (error) {
        return error;
    }
}