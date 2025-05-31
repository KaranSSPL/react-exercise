import { createPortal } from 'react-dom'
import AddReviewModal from './AddReviewModal'
import { useEffect, useRef, useState, useMemo } from 'react';

import { fetchMediaReviews } from '../api.jsx';
import ReviewCard from './ReviewCard.jsx';

const ReviewSection = ({ mediaType, id, styles }) => {

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(true);
    const [mediaReviews, setMediaReviews] = useState([]);
    const addReviewButtonRef = useRef(null);
    const [error, setError] = useState("");

    const addReview = (e) => {
        e.preventDefault();
        setIsReviewModalOpen(true);
    };

    const renderedReviews = useMemo(() => {
        return (
            <div className={styles["detail-wrapper"]}>
                {mediaReviews.map((item) => (
                    <ReviewCard key={item.id} item={item} styles={styles} />
                ))}
            </div>
        )
    }, [mediaReviews, styles]);

    const fetchReviews = async (mediaType, movieId) => {
        setReviewLoading(true);

        const response = await fetchMediaReviews(mediaType, movieId);

        if (response.code === "ERR_NETWORK") {
            setMediaReviews([]);
            setError(response.message);
        } else if (response.status === 200 && response.data?.isSuccess && response.data.data) {
            setMediaReviews(response.data.data);
        } else {
            setMediaReviews([]);
        }

        setReviewLoading(false);
    };

    const handleAddReviewToList = (newReview) => {
        setMediaReviews((prev) => [newReview, ...prev]);
    };

    useEffect(() => {
        fetchReviews(mediaType, id);
    }, [id, mediaType])

    return (
        <div className={styles["review-section"]}>
            <div className={styles["review-header-top"]}>
                <h3>User Reviews</h3>
                <button onClick={addReview} className={styles["add-review-button"]} ref={addReviewButtonRef}>
                    + Add Review
                </button>
                {isReviewModalOpen &&
                    createPortal(
                        <AddReviewModal
                            onClose={() => {
                                setIsReviewModalOpen(false);
                                addReviewButtonRef.current?.focus();
                            }}
                            id={id}
                            mediaType={mediaType}
                            onReviewSubmit={handleAddReviewToList} />,
                        document.getElementById("modal-root")
                    )}
            </div>

            {reviewLoading ? (
                <div className={styles["review-loader-wrapper"]}>
                    <div className={styles["spinner-inline"]}></div>
                </div>
            ) : error ? (
                <p className={styles["no-reviews"]}>
                    {`Failed to load reviews: ${error}`}
                </p>
            ) : mediaReviews && mediaReviews.length > 0 ? (
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