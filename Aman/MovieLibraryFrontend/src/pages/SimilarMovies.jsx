import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { config } from "../utils/axiosConfig";

import styles from '../css/movieGallery.module.css';
import Loader from "../components/Loader";
import FailedToFetchMovies from "../components/FailedToFetchMovies";
import Pagination from "../components/Pagination";

const SimilarMovies = () => {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [fetchError, setFetchError] = useState("");

    const fetchSimilarMovies = async (movieId, pageNumber) => {
        setIsLoading(true);
        setFetchError("");
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_MOVIE_API_BASE_URL}/3/movie/${movieId}/similar?language=${process.env.REACT_APP_MOVIE_API_LANGUAGE}&page=${pageNumber}`,
                config
            );
            if (!res || !res.data || !res.data.results) {
                setSimilarMovies([]);
            } else {
                setSimilarMovies(res.data.results);
                setTotalPage(res.data.total_pages);
            }
        } catch (err) {
            const message = err?.response?.data?.status_message || "Unexpected error occurred.";
            setSimilarMovies([]);
            setFetchError(message)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSimilarMovies(id, currentPageNumber);
    }, [id, currentPageNumber]);

    const handlePageChange = (page) => {
        setCurrentPageNumber(page);
    };

    return isLoading ? (
        <Loader />
    ) : fetchError ? (
        <>
            <FailedToFetchMovies message={fetchError} />
            <Pagination
                currentPageNumber={currentPageNumber}
                totalPage={totalPage}
                onPageChange={handlePageChange}
            />
        </>
    ) : (
        <>
            <div className={styles["gallery-wrapper"]}>
                {similarMovies && similarMovies.length > 0 ? (
                    <div className={styles.gallery} id="gallery">
                        {similarMovies.map((item) => (
                            <Link to={`/movies/${item.id}?page=${currentPageNumber || 1}`} className={styles["movie-link"]} key={item.id}>
                                <div className={styles["movie-card"]}>
                                    <img src={`${process.env.REACT_APP_IMAGE_URL}/w200${item.poster_path}`}
                                        alt="Movie Poster" style={{ borderRadius: '0', height: '448px' }} />
                                    <div className={styles["movie-content"]}>
                                        <div className={styles["movie-title"]}>{item.title}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <FailedToFetchMovies message={"No similar movies available."} />
                )}
            </div >
            <Pagination
                currentPageNumber={currentPageNumber}
                totalPage={totalPage}
                onPageChange={handlePageChange}
            />
        </>
    )
}

export default SimilarMovies