import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createPortal } from "react-dom";

import styles from "../css/movieDetail.module.css";
import ShareModal from "../components/ShareModal.jsx";
import Loader from "../components/Loader.jsx";
import NotFound from "../components/NotFound.jsx";
import ReviewSection from "../components/ReviewSection.jsx";

import { fetchMediaDetail } from "../api.jsx";

const MovieDetail = () => {
  const { mediaType, id } = useParams();

  const [mediaDetail, setMediaDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [isMediaFound, setIsMediaFound] = useState(true);
  const shareButtonRef = useRef(null);

  useEffect(() => {
    fetchDetail(mediaType, id);
    setIsSharePopupOpen(false);
  }, [id, mediaType]);

  const fetchDetail = async (mediaType, movieId) => {
    setIsLoading(true);

    const response = await fetchMediaDetail(mediaType, movieId);
    if (response.status === 200 && response.data) {
      setMediaDetail(response.data);
      setIsMediaFound(true);
    } else {
      setIsMediaFound(false);
      setMediaDetail(null);
    }

    setIsLoading(false);
  };

  const handleShare = (e) => {
    e.preventDefault();
    setIsSharePopupOpen(true);
  };

  if (isLoading) return <Loader />;
  if (!isMediaFound) return <NotFound />;

  return (
    <>
      <div className={styles["movie-page-container"]}>
        <div className={styles["movie-banner"]}>
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}/w1280${mediaDetail?.backdrop_path}`}
            alt="Background Poster"
            className={styles["movie-banner-img"]}
          />
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.description}>
          <div className={styles["movie-content"]}>
            <img src={`${process.env.REACT_APP_IMAGE_URL}/w300${mediaDetail?.poster_path}`} alt="Movie Poster" className={styles["movie-poster-detail-page"]} />
            <div className={styles["movie-info-detail-page"]}>
              <h2 className={styles["movie-title-detail-page"]}>
                {mediaDetail?.original_title ?? mediaDetail?.original_name}
              </h2>
              <p className={styles["movie-release"]}>
                Release: {mediaDetail?.release_date ?? mediaDetail?.first_air_date}
              </p>
              <p className={styles["movie-rating-detail-page"]}>
                ⭐ {mediaDetail?.vote_average}
              </p>

              {/* Genres */}
              <div className={styles["movie-genres"]}>
                <strong>Genres</strong>
                <ul className={styles["genres-list"]}>
                  {mediaDetail?.genres.map((item) => (
                    <li key={item.id}>
                      <span className={styles["genre-badge"]}>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className={styles["movie-description-detail-page"]}>
                {mediaDetail?.overview}
              </p>

              <div className={styles["movie-actions"]}>
                <button onClick={(e) => handleShare(e)} className={styles["share-button"]} ref={shareButtonRef}>
                  Share
                </button>
                {isSharePopupOpen &&
                  createPortal(
                    <ShareModal onClose={() => {
                      setIsSharePopupOpen(false);
                      shareButtonRef.current?.focus();
                    }} />,
                    document.getElementById("modal-root")
                  )}
                <Link to={`/${mediaType}/${id}/gallery`} className={`${styles["movie-link"]} ${styles["share-button"]}`}>
                  Gallery
                </Link>
                <Link to={`/${mediaType}/${id}/similar`} className={`${styles["movie-link"]} ${styles["share-button"]}`}>
                  Similar Movies
                </Link>
              </div>
            </div>
          </div>
          <ReviewSection mediaType={mediaType} id={id} styles={styles} />
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
