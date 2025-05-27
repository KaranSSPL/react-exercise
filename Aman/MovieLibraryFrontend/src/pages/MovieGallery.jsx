import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";

import styles from '../css/movieGallery.module.css';
import MovieGalleryImage from '../components/MovieGalleryImage';
import Loader from "../components/Loader";
import { config } from "../utils/axiosConfig";
import FailedToFetchMovies from "../components/FailedToFetchMovies";
import ImageModal from "../components/ImageModal";

const MovieGallery = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [galleryImages, setGalleryImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const fetchGalleryImages = async (movieId) => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_MOVIE_API_BASE_URL}/3/movie/${movieId}/images`,
                config
            );
            setGalleryImages((response?.data?.posters || []).slice(0, 50));
        } catch (error) {
            console.error("Error fetching movie gallery:", error);
            setGalleryImages([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGalleryImages(id);
    }, [id])

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedImageIndex(currentImageIndex);
    }

    const handleImageSlider = (direction) => {
        setCurrentImageIndex(direction);
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div className={styles["gallery-wrapper"]}>
            {galleryImages && galleryImages.length > 0 ? (
                <div className={styles.gallery} id="gallery">
                    {galleryImages.map((gallery, index) => (
                        <MovieGalleryImage
                            key={index}
                            index={index}
                            gallery={gallery}
                            handleImageClick={() => handleImageClick(index)}
                            isSelected={selectedImageIndex === index}
                            styles={styles}
                        />
                    ))}
                    {isModalOpen && createPortal(
                        <ImageModal
                            onClose={handleCloseModal}
                            currentImageIndex={currentImageIndex}
                            handleImageSlider={handleImageSlider}
                            images={galleryImages}
                            styles={styles}
                        />,
                        document.getElementById("modal-root")
                    )}
                </div>
            ) : (
                <FailedToFetchMovies message={"No images available."} />
            )}
        </div>
    );
}

export default MovieGallery