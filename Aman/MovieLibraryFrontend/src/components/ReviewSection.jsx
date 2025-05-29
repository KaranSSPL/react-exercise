import { createPortal } from 'react-dom'
import AddReviewModal from './AddReviewModal'
import { useEffect, useRef, useState } from 'react';

import { fetchMediaReviews } from '../api.jsx';

const ReviewSection = ({ mediaType, id, styles }) => {

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(true);
    const [mediaReviews, setMediaReviews] = useState([]);
    const addReviewButtonRef = useRef(null);
    const [apiError, setApiError] = useState("");

    const addReview = (e) => {
        e.preventDefault();
        setIsReviewModalOpen(true);
    };

    const fetchReviews = async (mediaType, movieId) => {
        setReviewLoading(true);
        
        const response = await fetchMediaReviews(mediaType, movieId);

        if (response.code === "ERR_NETWORK") {
            setMediaReviews([]);
            setApiError(response.message);
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
                <button
                    onClick={addReview}
                    className={styles["add-review-button"]}
                    ref={addReviewButtonRef}
                >
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
                            onReviewSubmit={handleAddReviewToList}
                        />,
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
            ) : mediaReviews && mediaReviews.length > 0 ? (
                <div className={styles["detail-wrapper"]}>
                    {mediaReviews.map((item) => (
                        <div key={item.id} className={styles["review-card"]} id={item.id}>
                            <div className={styles["review-header"]}>
                                <span className={styles["review-username"]}>{`${item.firstName} ${item.lastName}`}</span>
                                <span className={styles["review-date"]}>
                                    {new Date(item.createdDate).toLocaleDateString()}
                                </span>
                            </div>
                            <div className={styles["review-content"]}>
                                <p>{item.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles["no-reviews"]}>
                    No reviews yet. Be the first to add one!
                </p>
            )}
        </div>
    );

}

export default ReviewSection