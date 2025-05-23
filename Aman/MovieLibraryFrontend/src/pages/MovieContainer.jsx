import { useEffect, useState } from "react";
import axios from "axios";

import { config } from "../utils/axiosConfig.js";
import Loader from "../components/Loader.jsx";
import Header from "../components/Header.jsx";
import Pagination from "../components/Pagination.jsx";
import NotFound from "../components/NotFound.jsx";
import MovieListCard from "../components/MovieListCard.jsx";
import FailedToFetchMovies from "../components/FailedToFetchMovies.jsx";

const MovieContainer = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [foundSearchResult, setFoundSearchResult] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const fetchMovies = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      setFetchError("");
      const response = await axios.get(
        `${process.env.REACT_APP_MOVIE_API_BASE_URL}/3/discover/movie?language=${process.env.REACT_APP_MOVIE_API_LANGUAGE}&page=${pageNumber}`,
        config
      );
      // ToDo: handle null error
      const result = response?.data?.results || [];

      setMoviesList(result);
      setTotalPage(response?.data?.total_pages || 0);
      setFoundSearchResult(false);
    } catch (error) {
      const message = error?.response?.data?.status_message || "Unexpected error occurred.";
      setMoviesList([]);
      setFoundSearchResult(false);
      setFetchError(message)
    } finally {
      setIsLoading(false);
    }
  };

  const searchMovies = async (searchText, pageNumber = 1) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_MOVIE_API_BASE_URL}/3/search/movie?query=${searchText}&language=${process.env.REACT_APP_MOVIE_API_LANGUAGE}&page=${pageNumber}`,
        config
      );
      // ToDo: handle null error
      setTotalPage(response?.data?.total_pages || 0);
      
      if (response?.data?.results <= 0) {
        setFoundSearchResult(true);
      } else {
        setFoundSearchResult(false);
        setMoviesList(response.data.results);
      }
    } catch (error) {
      console.error("Error while searching movie:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchMovie.trim()
      ? searchMovies(searchMovie, currentPageNumber)
      : fetchMovies(currentPageNumber);
  }, [searchMovie, currentPageNumber]);

  const handleSearch = (query) => {
    setSearchMovie(query);
    setCurrentPageNumber(1);
  };

  const handlePageChange = (page) => {
    setCurrentPageNumber(page);
  };

  return (
    <>
      <Header searchMovie={searchMovie} onSearch={handleSearch} />
      {isLoading ? (
        <Loader />
      ) : foundSearchResult ? (
        <NotFound />
      ) : fetchError ? (
        <>
          <FailedToFetchMovies message={fetchError} />
          <Pagination
            currentPageNumber={currentPageNumber}
            totalPage={totalPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <>
          <div className="movie-grid">
            {moviesList.map((movie) => (
              <MovieListCard key={movie.id} movie={movie} />
            ))}
          </div>
          <Pagination
            currentPageNumber={currentPageNumber}
            totalPage={totalPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default MovieContainer;
