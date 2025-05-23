import { createPortal } from 'react-dom'
import AddReviewModal from './AddReviewModal'
import { useState } from 'react';

const ReviewSection = ({ id, handleAddReviewToList, movieReviews }) => {

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const addReview = (e) => {
        e.preventDefault();
        setIsReviewModalOpen(true);
    };

    return (
        <div className="review-section">
            <div className="review-header-top">
                <h3>User Reviews</h3>
                <button onClick={addReview} className="add-review-button">
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

            {movieReviews && movieReviews.length > 0 ? (
                <div className="detail-wrapper">
                    {movieReviews.map((item, index) => (
                        <div key={index} className="review-card">
                            <div className="review-header">
                                <span className="review-username">{`${item.firstName} ${item.lastName}`}</span>
                                <span className="review-date">
                                    {new Date(item.createdDate).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="review-content">
                                <p>{item.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-reviews">
                    No reviews yet. Be the first to add one!
                </p>
            )}
        </div>
    )
}

export default ReviewSection