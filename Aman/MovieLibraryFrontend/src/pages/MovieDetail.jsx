import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import axios from "axios";

import "../css/movieDetail.css";
import { config } from "../utils/axiosConfig.js";
import ShareModal from "../components/ShareModal.jsx";
import Loader from "../components/Loader.jsx";
import NotFound from "../components/NotFound.jsx";
import ReviewSection from "../components/ReviewSection.jsx";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [isMovieFound, setIsMovieFound] = useState(true);

  useEffect(() => {
    fetchMovieDetail(id);
    fetchReviews(id);
    setIsSharePopupOpen(false);
  }, [id]);

  const fetchMovieDetail = async (movieId) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_MOVIE_API_BASE_URL}/3/movie/${movieId}?language=${process.env.REACT_APP_MOVIE_API_LANGUAGE}`,
        config
      );
      if (!res || !res.data) {
        setIsMovieFound(false);
        setMovieDetail(null);
      } else {
        setMovieDetail(res.data);
        setIsMovieFound(true);
      }
    } catch (err) {
      console.error("Failed to fetch movie:", err);
      setIsMovieFound(false);
      setMovieDetail(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReviews = async (movieId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_REVIEW_API_BASE_URL}/${movieId}/reviews`
      );

      if (res.status === 200 && res.data?.isSuccess && res.data.data) {
        setMovieReviews(res.data.data);
      } else {
        setMovieReviews([]);
      }
    } catch (error) {
      setMovieReviews([]);
      if (error.response?.status === 404) {
        console.error("Failed to fetch reviews:", error);
      }
    }
  };

  const handleShare = (e) => {
    e.preventDefault();
    setIsSharePopupOpen(true);
  };

  const handleAddReviewToList = (newReview) => {
    setMovieReviews((prev) => [newReview, ...prev]);
  };

  // ToDo : don't show loader when there is no movie
  if (isLoading) return <Loader />;
  if (!isMovieFound) return <NotFound />;

  return (
    <>
      <div className="movie-page-container">
        <div className="movie-banner">
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}/w1280${movieDetail?.backdrop_path}`}
            alt="Background Poster"
            className="movie-banner-img"
          />
          <div className="overlay"></div>
        </div>

        <div className="description">
          <div className="movie-content">
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}/w300${movieDetail?.poster_path}`}
              alt="Movie Poster"
              className="movie-poster-detail-page"
            />
            <div className="movie-info-detail-page">
              <h2 className="movie-title-detail-page">
                {movieDetail?.original_title}
              </h2>
              <p className="movie-release">
                Release: {movieDetail?.release_date}
              </p>
              <p className="movie-rating-detail-page">
                ⭐ {movieDetail?.vote_average}
              </p>

              {/* Genres */}
              <div className="movie-genres">
                <strong>Genres</strong>
                <ul className="genres-list">
                  {movieDetail?.genres.map((item) => (
                    <li key={item.id}>
                      <span className="genre-badge">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="movie-description-detail-page">
                {movieDetail?.overview}
              </p>

              <div className="movie-actions">
                <button
                  onClick={(e) => handleShare(e)}
                  className="share-button"
                >
                  Share
                </button>
                {isSharePopupOpen &&
                  createPortal(
                    <ShareModal onClose={() => setIsSharePopupOpen(false)} />,
                    document.getElementById("modal-root")
                  )}
              </div>
            </div>
          </div>
          {
            // TODO: create a separate component for reviews
          }
          <ReviewSection id={id}
            handleAddReviewToList={handleAddReviewToList}
            movieReviews={movieReviews} />
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
