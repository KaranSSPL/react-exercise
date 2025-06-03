import { useEffect } from "react";
import { envVar } from "../utils/env-var";

const ImageModal = ({ onClose, currentImageIndex, handleImageSlider, images, styles }) => {
    const imageUrl = `${envVar.tmdbApi.image.baseUrl}/w500${images[currentImageIndex].file_path}`;

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

    return (
        <div className={styles.modal} id="modal">
            <button className={styles.close} onClick={onClose}>&times;</button>
            <button className={styles.prev} onClick={() => handleImageSlider((x) => x - 1)} disabled={currentImageIndex === 0}>&#10094;</button>
            <div className={styles["modal-content-image"]}>
                <img id="modalImage" src={imageUrl} alt="modal" />
            </div>
            <button className={styles.next} onClick={() => handleImageSlider((x) => x + 1)} disabled={currentImageIndex === images.length - 1}>&#10095;</button>
        </div >
    )
}

export default ImageModal