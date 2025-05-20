import { useEffect, useContext, useState } from 'react';
import { MovieContext } from '../MovieContext.jsx';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { config } from '../global/globalVariables.js'
import '../css/movieDetail.css';
import AddReviewModal from './AddReviewModal.jsx';
import SharePopModal from "./SharePopModal.jsx";

const MovieDetail = () => {
    const { id } = useParams();
    const { selectedMovie, setSelectedMovie, reviews, fetchReview } = useContext(MovieContext);
    const movie = selectedMovie;

    const [sharePop, setSharePop] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, config);
                setSelectedMovie(res.data);
            } catch (err) {
                console.error("Failed to fetch movie:", err);
            }
        };

        fetchMovieDetail();
        fetchReview(id);
    }, [id, setSelectedMovie]);

    const handleShare = (e) => {
        e.preventDefault();
        setSharePop(true);
        return;
    };

    const addReview = (e) => {
        e.preventDefault();
        setShowReviewModal(true);
        return;
    };

    if (!movie) return <div>Loading...</div>;

    return (
        <>
            <div className="movie-page-container">
                <div className="movie-banner">
                    <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt="Background Poster" className="movie-banner-img" />
                    <div className="overlay"></div>
                </div>

                <div className="movie-content">
                    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="Movie Poster" className="movie-poster-detail-page" />
                    <div className="movie-info-detail-page">
                        <h2 className="movie-title-detail-page">{movie.original_title}</h2>
                        <p className="movie-release">Release: {movie.release_date}</p>
                        <p className="movie-rating-detail-page">⭐ {movie.vote_average}</p>

                        {/* Genres */}
                        <div className="movie-genres">
                            <strong>Genres</strong>
                            <ul className="genres-list">
                                {movie.genres.map(item => (
                                    <li key={item.id}>
                                        <span className="genre-badge">{item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <p className="movie-description-detail-page">{movie.overview}</p>

                        <div className="movie-actions">
                            <button onClick={(e) => handleShare(e)} className="share-button">
                                Share
                            </button>
                        </div>
                    </div>
                </div>

                <div className="review-section">
                    <div className="review-header-top">
                        <h3>User Reviews</h3>
                        <button onClick={addReview} className="add-review-button">+ Add Review</button>
                    </div>

                    {reviews.length > 0 ? (
                        reviews.map((item, index) => (
                            <div key={index} className="review-card">
                                <div className="review-header">
                                    <span className="review-username">{`${item.firstName} ${item.lastName}`}</span>
                                    <span className="review-date">{new Date(item.createdDate).toLocaleDateString()}</span>
                                </div>
                                <div className="review-content">
                                    <p>{item.comment}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-reviews">No reviews yet. Be the first to add one!</p>
                    )}
                </div>
            </div>
            <AddReviewModal showReviewModal={showReviewModal} setShowReviewModal={setShowReviewModal} id={id} />
            <SharePopModal sharePop={sharePop} setSharePop={setSharePop} />
        </>
    )
}

export default MovieDetail;