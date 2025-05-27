import { createPortal } from 'react-dom'
import AddReviewModal from './AddReviewModal'
import { useState } from 'react';

const ReviewSection = ({ id, handleAddReviewToList, movieReviews, styles, reviewLoading }) => {

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const addReview = (e) => {
        e.preventDefault();
        setIsReviewModalOpen(true);
    };

    return (
        <div className={styles["review-section"]}>
            <div className={styles["review-header-top"]}>
                <h3>User Reviews</h3>
                <button onClick={addReview} className={styles["add-review-button"]}>
                    + Add Review
                </button>
                {isReviewModalOpen &&
                    createPortal(
                        <AddReviewModal
                            onClose={() => setIsReviewModalOpen(false)}
                            id={id}
                            onReviewSubmit={handleAddReviewToList}
                        />,
                        document.getElementById("modal-root")
                    )}
            </div>

            {reviewLoading ? (
                <div className={styles["review-loader-wrapper"]}>
                    <div className={styles["spinner-inline"]}></div>
                </div>
            ) : movieReviews && movieReviews.length > 0 ? (
                <div className={styles["detail-wrapper"]}>
                    {movieReviews.map((item, index) => (
                        <div key={index} className={styles["review-card"]}>
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
    )
}

export default ReviewSection