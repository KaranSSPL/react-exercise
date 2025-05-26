const ImageModal = ({ onClose, currentImageIndex, handleImageSlider, images }) => {
    const imageUrl = `${process.env.REACT_APP_IMAGE_URL}/w500${images[currentImageIndex].file_path}`;
    return (
        <div className="modal" id="modal">
            <button className="close" onClick={onClose}>&times;</button>
            <button className="prev" onClick={() => handleImageSlider((x) => x - 1)} disabled={currentImageIndex === 0}>&#10094;</button>
            <div className="modal-content-image">
                <img id="modalImage" src={imageUrl} alt="modal" />
            </div>
            <button className="next" onClick={() => handleImageSlider((x) => x + 1)} disabled={currentImageIndex === images.length - 1}>&#10095;</button>
        </div >
    )
}

export default ImageModal