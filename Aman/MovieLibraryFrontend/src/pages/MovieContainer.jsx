import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../css/index.css";
import Loader from "../components/Loader.jsx";
import Header from "../components/Header.jsx";
import Pagination from "../components/Pagination.jsx";
import NotFound from "../components/NotFound.jsx";
import MovieListCard from "../components/MovieListCard.jsx";
import FailedToFetchMovies from "../components/FailedToFetchMovies.jsx";

import { fetchMoviesList, searchMoviesList } from "../api.jsx";

const MovieContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || 1;
  const navigate = useNavigate();

  const [searchMovie, setSearchMovie] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(Number(page));
  const [isLoading, setIsLoading] = useState(true);
  const [foundSearchResult, setFoundSearchResult] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const fetchMovies = async (pageNumber = 1) => {
    setIsLoading(true);
    setFetchError("");

    const response = await fetchMoviesList(pageNumber);
    if (response?.status === 200) {
      const result = response?.data?.results || [];
      setMoviesList(result);
      setTotalPage(response?.data?.total_pages || 0);
      setFoundSearchResult(false);
    } else {
      const message = response?.response?.data?.status_message || "Unexpected error occurred.";
      setMoviesList([]);
      setFoundSearchResult(false);
      setFetchError(message)
    }

    setIsLoading(false);
  };

  const searchMovies = async (searchText, pageNumber = 1) => {
    setIsLoading(true);
    setFetchError("");
    
    const response = await searchMoviesList(searchText, pageNumber)
    if (response?.status === 200) {
      setTotalPage(response?.data?.total_pages || 0);

      if (response?.data?.results <= 0) {
        setFoundSearchResult(true);
      } else {
        setFoundSearchResult(false);
        setMoviesList(response.data.results);
      }
    } else {
      const message = response?.response?.data?.status_message || "Unexpected error occurred.";
      setMoviesList([]);
      setFoundSearchResult(false);
      setFetchError(message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      searchMovie.trim()
        ? searchMovies(searchMovie, currentPageNumber)
        : fetchMovies(currentPageNumber);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchMovie, currentPageNumber]);

  const handleSearch = (query) => {
    setSearchMovie(query);
    setCurrentPageNumber(1);
    navigate(`?page=1`);
  };

  const handlePageChange = (page) => {
    setCurrentPageNumber(page);
    navigate(`?page=${page}`);
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
              <MovieListCard key={movie.id} movie={movie} currentPage={currentPageNumber} />
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
