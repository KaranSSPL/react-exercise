import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../css/index.css";
import Loader from "../components/Loader.jsx";
import Header from "../components/Header.jsx";
import Pagination from "../components/Pagination.jsx";
import NotFound from "../components/NotFound.jsx";
import MovieListCard from "../components/MovieListCard.jsx";
import FailedToFetchMovies from "../components/FailedToFetchMovies.jsx";

import { fetchMediaList, searchMediaList } from "../api.jsx";

const MovieContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get("page")) || 1;
  const searchQuery = queryParams.get("search") || "";
  const mediaTypeFromURL = queryParams.get("mediaType") || "movie";
  const selectedGenreIdFromURL = queryParams.get("genreId");

  const navigate = useNavigate();

  const [searchedMedia, setSearchedMedia] = useState(searchQuery);
  const [mediaType, setMediaType] = useState(mediaTypeFromURL);
  const [mediaList, setMediaList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(page);
  const [isLoading, setIsLoading] = useState(true);
  const [foundSearchResult, setFoundSearchResult] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState(
    selectedGenreIdFromURL ? Number(selectedGenreIdFromURL) : null
  );

  const fetchMedia = async (mediaType, pageNumber = 1, genreId = null) => {
    setIsLoading(true);
    setFetchError("");

    const response = await fetchMediaList(mediaType, pageNumber, genreId);
    if (response?.status === 200) {
      const result = response?.data?.results || [];
      setMediaList(result);
      setTotalPage(response?.data?.total_pages || 0);
      setFoundSearchResult(false);
    } else {
      const message = response?.response?.data?.status_message || "Unexpected error occurred.";
      setMediaList([]);
      setFoundSearchResult(false);
      setFetchError(message)
    }

    setIsLoading(false);
  };

  const searchMedia = async (mediaType, searchText, pageNumber = 1) => {
    setIsLoading(true);
    setFetchError("");

    const response = await searchMediaList(mediaType, searchText, pageNumber)
    if (response?.status === 200) {
      setTotalPage(response?.data?.total_pages || 0);

      if (response?.data?.results <= 0) {
        setFoundSearchResult(true);
      } else {
        setFoundSearchResult(false);
        setMediaList(response.data.results);
      }
    } else {
      const message = response?.response?.data?.status_message || "Unexpected error occurred.";
      setMediaList([]);
      setFoundSearchResult(false);
      setFetchError(message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchedMedia.trim()) {
        searchMedia(mediaType, searchedMedia, currentPageNumber)
      } else {
        fetchMedia(mediaType, currentPageNumber, selectedGenreId);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchedMedia, currentPageNumber, mediaType, selectedGenreId]);

  const buildQuery = (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        searchParams.set(key, value);
      }
    });
    return `?${searchParams.toString()}`;
  };

  const handleSearch = (query) => {
    setSearchedMedia(query);
    setCurrentPageNumber(1);

    const params = {
      page: 1,
      search: query.trim() || undefined,
      mediaType
    };
    navigate(buildQuery(params));

  };

  const handlePageChange = (page) => {
    setCurrentPageNumber(page);
    const params = {
      page,
      mediaType,
      search: searchedMedia.trim() || undefined,
      genreId: selectedGenreId !== null ? selectedGenreId : undefined,
    };
    navigate(buildQuery(params));
  };

  const handleMediaTypeChange = (type) => {
    setMediaType(type);
    setCurrentPageNumber(1);
    setSelectedGenreId(null);
    const params = {
      mediaType: type,
      page: 1,
      search: searchedMedia.trim() || undefined,
    };
    navigate(buildQuery(params));
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenreId(genreId);
    setCurrentPageNumber(1);
    const params = {
      mediaType,
      page: 1,
      genreId: genreId !== null ? genreId : undefined,
      search: genreId === null && searchedMedia.trim() ? searchedMedia.trim() : undefined,
    };
    navigate(buildQuery(params));
  };

  return (
    <>
      <Header
        searchedMedia={searchedMedia}
        onSearch={handleSearch}
        mediaType={mediaType}
        onMediaTypeChange={handleMediaTypeChange}
        onGenreSelect={handleGenreSelect}
        selectedGenreId={selectedGenreId} />
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
            {mediaList.map((media) => (
              <MovieListCard
                key={media.id}
                media={media}
                currentPage={currentPageNumber}
                mediaType={mediaType} />
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
