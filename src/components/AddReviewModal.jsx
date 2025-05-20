import React, { useContext, useState } from 'react'
import axios from 'axios';
import '../css/addReviewModal.css'
import { MovieContext } from '../MovieContext';

const AddReviewModal = ({ showReviewModal, setShowReviewModal, id }) => {
    const { fetchReview } = useContext(MovieContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        comment: ''
    });

    const closeModal = () => {
        setShowReviewModal(false);
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                'movieId': id,
                'firstName': formData.firstName,
                'lastName': formData.lastName,
                'comment': formData.comment
            };

            const res = await axios.post("https://localhost:7051/api/ReviewMovie/save-review", data);
            if (res.data?.isSuccess) {
                fetchReview(id);
                setFormData({ firstName: '', lastName: '', comment: '' });
                closeModal();
            } else {
                console.warn("Review submission failed.");
            }
        } catch (error) {
            console.error("Error saving review:", error);
        }
    };

    if (!showReviewModal) return null;

    return (
        <div className="modal-overlay-review">
            <div className="modal-content-review">
                <h2>Add a Review</h2>
                <form onSubmit={handleSubmit} className="review-form">
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                    <textarea name="comment" placeholder="Your Review" value={formData.comment} onChange={handleChange} required />
                    <div className="modal-actions">
                        <button type="submit" className="submit-button">Submit</button>
                        <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddReviewModal;