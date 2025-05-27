import { useState } from "react";
import axios from "axios";
import styles from "../css/addReviewModal.module.css";

const AddReviewModal = ({ onClose, id, onReviewSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.comment) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        comment: formData.comment,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_REVIEW_API_BASE_URL}/${id}/reviews`,
        data
      );

      if (res.data?.isSuccess) {
        const newReview = {
          ...data,
          createdDate: new Date().toISOString(),
        };

        if (onReviewSubmit) {
          onReviewSubmit(newReview);
        }

        setFormData({ firstName: "", lastName: "", comment: "" });
        onClose();
      } else {
        // ToDo : show error message to user.
        alert("Review submission failed.");
        onClose();
        // console.warn("Review submission failed.");
      }
    } catch (error) {
      // ToDo : show error message to user.
      alert("An error occurred while submitting your review.", error);
      onClose();
      // console.error("Error saving review:", error);
    }
  };

  return (
    <div className={styles["modal-overlay-review"]}>
      <div className={styles["modal-content-review"]}>
        <h2>Add a Review</h2>
        <form onSubmit={handleSubmit} className={styles["review-form"]}>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          <textarea name="comment" placeholder="Your Review" value={formData.comment} onChange={handleChange} required />
          <div className={styles["modal-actions"]}>
            <button type="submit" className={styles["submit-button"]}>
              Submit
            </button>
            <button type="button" className={styles["cancel-button"]} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
