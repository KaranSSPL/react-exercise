import { useEffect, useState } from "react";
import styles from "../css/addReviewModal.module.css";
import { submitMediaReview } from "../api";

const AddReviewModal = ({ onClose, id, mediaType, onReviewSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      comment: formData.comment,
    };

    const response = await submitMediaReview(mediaType, id, data);

    if (response.status === 400) {
      const apiErrors = response.response?.data?.errors;
      if (apiErrors) {
        const apiErrorMessages = {};
        for (const key in apiErrors) {
          const camelKey = pascalToCamel(key);
          apiErrorMessages[camelKey] = apiErrors[key].join(" ");
        }
        setErrors(apiErrorMessages);
      } else {
        setErrors({ general: "An unexpected error occurred." });
      }
    } else if (response.status === 200 && response?.data?.isSuccess) {
      const newReview = {
        ...data,
        createdDate: new Date().toISOString(),
      };

      if (onReviewSubmit) {
        onReviewSubmit(newReview);
      }

      setFormData({ firstName: "", lastName: "", comment: "" });
      setErrors({});
      onClose();
    } else {
      setErrors({ general: "Review submission failed." });
    }

    setIsSubmitting(false);
  };

  const pascalToCamel = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  return (
    <div className={styles["modal-overlay-review"]}>
      <div className={styles["modal-content-review"]}>
        <h2>Add a Review</h2>
        {errors.general && (
          <div className={styles.error} style={{ marginBottom: "1rem" }}>
            {errors.general}
          </div>
        )}
        <form onSubmit={handleSubmit} className={styles["review-form"]}>
          <div>
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} autoFocus />
            {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
          </div>
          <div>
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
          </div>
          <div>
            <textarea name="comment" placeholder="Your Review" value={formData.comment} onChange={handleChange} />
            {errors.comment && <span className={styles.error}>{errors.comment}</span>}
          </div>
          <div className={styles["modal-actions"]}>
            <button type="submit" className={styles["submit-button"]} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
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
