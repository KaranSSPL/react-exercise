const MovieGalleryImage = ({ index, gallery, handleImageClick, isSelected }) => {
    const imageUrl = `${process.env.REACT_APP_IMAGE_URL}/w200${gallery.file_path}`;

    return (
        <>
            <button onClick={handleImageClick}
                className={`image-button ${isSelected ? "selected-image" : ""}`} >
                <img src={imageUrl} alt={index + 1} />
            </button>
        </>
    )
}

export default MovieGalleryImage