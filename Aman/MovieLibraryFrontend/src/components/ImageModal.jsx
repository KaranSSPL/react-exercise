const ImageModal = ({ onClose, currentImageIndex, handleImageSlider, images, styles }) => {
    const imageUrl = `${process.env.REACT_APP_IMAGE_URL}/w500${images[currentImageIndex].file_path}`;
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