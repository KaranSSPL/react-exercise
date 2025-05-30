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
  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get("page")) || 1;
  const searchQuery = queryParams.get("search") || "";
  const mediaTypeFromURL = queryParams.get("mediaType") || "movie";
  const selectedGenreIdFromURL = queryParams.get("genreId");
  const selectedSortIdFromURL = queryParams.get("sortId");

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
  const [selectedSortId, setSelectedSortId] = useState(
    selectedSortIdFromURL ? selectedSortIdFromURL : null
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setFetchError("");
      let response;

      if (selectedSortId) {
        response = await fetchSortByListOfMedia(mediaType, selectedSortId, currentPageNumber);
      } else if (searchedMedia) {
        response = await searchMediaList(mediaType, searchedMedia, currentPageNumber);
      } else {
        response = await fetchMediaList(mediaType, currentPageNumber, selectedGenreId);
      }

      if (response?.status === 200) {
        setMediaList(response.data.results || []);
        setTotalPage(response.data.total_pages || 0);
        setFoundSearchResult(!response.data.results.length);
      } else {
        const message = response?.response?.data?.status_message;
        setFetchError(message)
        setMediaList([]);
        setFoundSearchResult(false);
      }

      setIsLoading(false);
    };
    const handler = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(handler);
  }, [mediaType, searchedMedia, selectedGenreId, selectedSortId, currentPageNumber]);

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
      genreId: selectedSortId ? undefined : (selectedGenreId !== null ? selectedGenreId : undefined),
      sortId: selectedSortId || undefined,
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
      sortId: selectedSortId || undefined
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

  const handleSortSelect = (sortId) => {
    setSelectedSortId(sortId);
    setCurrentPageNumber(1);
    const params = {
      mediaType,
      page: 1,
      sortId: sortId || undefined
    };
    navigate(buildQuery(params));
  }

  return (
    <>
      <Header
        searchedMedia={searchedMedia}
        onSearch={handleSearch}
        mediaType={mediaType}
        onMediaTypeChange={handleMediaTypeChange}
        onGenreSelect={handleGenreSelect}
        selectedGenreId={selectedGenreId}
        onSortSelect={handleSortSelect}
        selectedSortId={selectedSortId} />
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
