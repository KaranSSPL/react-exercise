import { createPortal } from 'react-dom'
import AddReviewModal from './AddReviewModal'
import { useEffect, useRef, useState, useMemo } from 'react';

import { fetchMovieReviews } from '../api.jsx';
import ReviewCard from './ReviewCard.jsx';

const ReviewSection = ({ id, styles }) => {

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(true);
    const [movieReviews, setMovieReviews] = useState([]);
    const addReviewButtonRef = useRef(null);
    const [apiError, setApiError] = useState("");

    const addReview = (e) => {
        e.preventDefault();
        setIsReviewModalOpen(true);
    };

    const renderedReviews = useMemo(() => {
        if (!movieReviews || movieReviews.length === 0) return null;

        return (
            <div className={styles["detail-wrapper"]}>
                {movieReviews.map((item) => (
                    <ReviewCard key={item.id} item={item} styles={styles} />
                ))}
            </div>
        )
    }, [movieReviews, styles]);

    const fetchReviews = async (movieId) => {
        setReviewLoading(true);

        const response = await fetchMovieReviews(movieId);

        if (response.code === "ERR_NETWORK") {
            setMovieReviews([]);
            setApiError(response.message);
        } else if (response.status === 200 && response.data?.isSuccess && response.data.data) {
            setMovieReviews(response.data.data);
        } else {
            setMovieReviews([]);
        }

        setReviewLoading(false);
    };

    const handleAddReviewToList = (newReview) => {
        setMovieReviews((prev) => [newReview, ...prev]);
    };

    useEffect(() => {
        fetchReviews(id);
    }, [id])

    return (
        <div className={styles["review-section"]}>
            <div className={styles["review-header-top"]}>
                <h3>User Reviews</h3>
                <button onClick={addReview} className={styles["add-review-button"]} ref={addReviewButtonRef}>
                    + Add Review
                </button>
                {isReviewModalOpen &&
                    createPortal(
                        <AddReviewModal onClose={() => {
                            setIsReviewModalOpen(false);
                            addReviewButtonRef.current?.focus();
                        }} id={id} onReviewSubmit={handleAddReviewToList} />,
                        document.getElementById("modal-root")
                    )}
            </div>

            {reviewLoading ? (
                <div className={styles["review-loader-wrapper"]}>
                    <div className={styles["spinner-inline"]}></div>
                </div>
            ) : apiError ? (
                <p className={styles["no-reviews"]}>
                    {`Failed to load reviews: ${apiError}`}
                </p>
            ) : movieReviews && movieReviews.length > 0 ? (
                renderedReviews
            ) : (
                <p className={styles["no-reviews"]}>
                    No reviews yet. Be the first to add one!
                </p>
            )}
        </div>
    );

}

export default ReviewSection