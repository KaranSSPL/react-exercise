import { envVar } from "../utils/env-var";

const MovieGalleryImage = ({ index, gallery, handleImageClick, isSelected, styles }) => {
    const imageUrl = `${envVar.tmdbApi.image.baseUrl}/w200${gallery.file_path}`;

    return (
        <button onClick={handleImageClick}
            className={`${styles["image-button"]} ${isSelected ? styles["selected-image"] : ""}`} >
            <img src={imageUrl} alt={index + 1} />
        </button>
    )
}

export default MovieGalleryImage