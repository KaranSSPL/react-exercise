import React, { useContext, useState } from 'react'
import axios from 'axios';
import '../css/addReviewModal.css'
import { MovieContext } from '../context/MovieContext';

const AddReviewModal = ({ onClose, id }) => {
    const { fetchReview, loader, setLoader } = useContext(MovieContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        comment: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.comment) {
            alert("Please fill out all fields.");
            return;
        }

        setLoader(true);

        try {
            const data = {
                'movieId': id,
                'firstName': formData.firstName,
                'lastName': formData.lastName,
                'comment': formData.comment
            };

            const res = await axios.post(`${process.env.REACT_APP_REVIEW_API_BASE_URL}/ReviewMovie/save-review`, data);

            if (res.data?.isSuccess) {
                fetchReview(id);
                setFormData({ firstName: '', lastName: '', comment: '' });
                onClose();
            } else {
                console.warn("Review submission failed.");
            }
        } catch (error) {
            console.error("Error saving review:", error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="modal-overlay-review">
            <div className="modal-content-review">
                <h2>Add a Review</h2>
                <form onSubmit={handleSubmit} className="review-form">
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                    <textarea name="comment" placeholder="Your Review" value={formData.comment} onChange={handleChange} required />
                    <div className="modal-actions">
                        <button type="submit" className="submit-button" disabled={loader}>Submit</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddReviewModal;