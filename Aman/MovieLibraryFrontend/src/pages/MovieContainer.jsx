import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../css/index.css";
import Loader from "../components/Loader.jsx";
import Header from "../components/Header.jsx";
import Pagination from "../components/Pagination.jsx";
import NotFound from "../components/NotFound.jsx";
import MovieListCard from "../components/MovieListCard.jsx";
import FailedToFetchMovies from "../components/FailedToFetchMovies.jsx";

import { fetchMediaList, fetchSortByListOfMedia, searchMediaList } from "../api.jsx";

const MovieContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const initialPage = Number(queryParams.get("page")) || 1;
  const initialSearch = queryParams.get("search") || "";
  const initialMediaType = queryParams.get("mediaType") || "movie";
  const initialGenreId = queryParams.get("genreId");
  const initialSortId = queryParams.get("sortId");


  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [mediaType, setMediaType] = useState(initialMediaType);
  const [mediaList, setMediaList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState(
    initialGenreId ? Number(initialGenreId) : null
  );
  const [selectedSortId, setSelectedSortId] = useState(
    initialSortId ? initialSortId : null
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");
      let response;

      if (selectedSortId) {
        response = await fetchSortByListOfMedia(mediaType, selectedSortId, currentPage);
      } else if (searchTerm) {
        response = await searchMediaList(mediaType, searchTerm, currentPage);
      } else {
        response = await fetchMediaList(mediaType, currentPage, selectedGenreId);
      }

      if (response?.status === 200) {
        setMediaList(response.data.results || []);
        setTotalPage(response.data.total_pages || 0);
        setNoResults(!response.data.results.length);
      } else {
        const message = response?.response?.data?.status_message;
        setError(message || "Failed to fetch data.")
        setMediaList([]);
        setNoResults(false);
      }

      setIsLoading(false);
    };
    const handler = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(handler);
  }, [mediaType, searchTerm, selectedGenreId, selectedSortId, currentPage]);

  const buildQueryString = (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        searchParams.set(key, value);
      }
    });
    return `?${searchParams.toString()}`;
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);

    const params = {
      page: 1,
      search: query.trim() || undefined,
      mediaType
    };
    navigate(buildQueryString(params));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const params = {
      page,
      mediaType,
      search: searchTerm.trim() || undefined,
      genreId: selectedSortId ? undefined : (selectedGenreId !== null ? selectedGenreId : undefined),
      sortId: selectedSortId || undefined,
    };
    navigate(buildQueryString(params));
  };

  const handleMediaTypeChange = (type) => {
    setMediaType(type);
    setCurrentPage(1);
    setSelectedGenreId(null);
    const params = {
      mediaType: type,
      page: 1,
      search: searchTerm.trim() || undefined,
      sortId: selectedSortId || undefined
    };
    navigate(buildQueryString(params));
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenreId(genreId);
    setCurrentPage(1);
    const params = {
      mediaType,
      page: 1,
      genreId: genreId !== null ? genreId : undefined,
      search: genreId === null && searchTerm.trim() ? searchTerm.trim() : undefined,
    };
    navigate(buildQueryString(params));
  };

  const handleSortSelect = (sortId) => {
    setSelectedSortId(sortId);
    setCurrentPage(1);
    const params = {
      mediaType,
      page: 1,
      sortId: sortId || undefined
    };
    navigate(buildQueryString(params));
  }

  return (
    <>
      <Header
        searchedMedia={searchTerm}
        onSearch={handleSearch}
        mediaType={mediaType}
        onMediaTypeChange={handleMediaTypeChange}
        onGenreSelect={handleGenreSelect}
        selectedGenreId={selectedGenreId}
        onSortSelect={handleSortSelect}
        selectedSortId={selectedSortId} />
      {isLoading ? (
        <Loader />
      ) : noResults ? (
        <NotFound />
      ) : error ? (
        <>
          <FailedToFetchMovies message={error} />
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <>
          <div className="movie-grid">
            {mediaList.map((media) => (
              <MovieListCard
                key={media.id}
                media={media}
                currentPage={currentPage}
                mediaType={mediaType} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default MovieContainer;
