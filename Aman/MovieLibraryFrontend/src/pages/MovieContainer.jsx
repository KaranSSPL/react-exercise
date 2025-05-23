import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../utils/axiosConfig.js";
import Header from "../components/Header.jsx";
import Pagination from "../components/Pagination.jsx";
import NotFound from "../components/NotFound.jsx";
import MovieListCard from "../components/MovieListCard.jsx";

const MovieContainer = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [foundSearchResult, setFoundSearchResult] = useState(false);

  const fetchMovies = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_MOVIE_API_BASE_URL}/3/discover/movie?language=${process.env.REACT_APP_MOVIE_API_LANGUAGE}&page=${pageNumber}`,
        config
      );
      // ToDo: handle null error
      setFoundSearchResult(false);
      setMoviesList(response.data.results);
      setTotalPage(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setFoundSearchResult(false);
      setMoviesList([]);
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
      setTotalPage(response.data.total_pages);
      if (response.data.results <= 0) {
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
      {foundSearchResult ? (
        <NotFound />
      ) : (
        <>
          <div className="movie-grid">
            {isLoading ? (
              <Loader />
            ) : moviesList && moviesList.length > 0 ? (
              moviesList?.map((item) => (
                <MovieListCard key={item.id} movie={item} />
              ))
            ) : null}
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
