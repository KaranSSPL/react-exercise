import { useState, useEffect, useRef } from 'react';
import { fetchGenreListOfMedia } from '../api';

const GenreDropdown = ({ mediaType, onGenreSelect, selectedGenreId, disabled }) => {
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState('');
    const lastFetchedMediaTypeRef = useRef(null);

    useEffect(() => {
        const fetchGenre = async () => {
            if (!mediaType || lastFetchedMediaTypeRef.current === mediaType) return;

            setIsLoading(true);

            const response = await fetchGenreListOfMedia(mediaType);

            if (response?.status === 200) {
                setGenres(response.data.genres);
                setFetchError('');
                lastFetchedMediaTypeRef.current = mediaType;
            } else {
                const message = response?.response?.data?.status_message || 'Unexpected error occurred.';
                setGenres([]);
                setFetchError(message);
            }

            setIsLoading(false);
        };

        fetchGenre();
    }, [mediaType]);

    const handleChange = (event) => {
        const value = event.target.value;
        onGenreSelect(value === '' ? null : parseInt(value));
    };

    return (
        <div className="genre-select-wrapper">
            {fetchError ? (
                <div className="genre-error">{fetchError}</div>
            ) : (
                <select className="genre-select"
                    value={selectedGenreId ?? ''}
                    onChange={handleChange}
                    disabled={disabled || isLoading}>
                    <option value="">Reset</option>
                    {
                        genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))
                    }
                </select>
            )}
            {isLoading && (
                <div className="review-loader-wrapper">
                    <div className="spinner-inline"></div>
                </div>
            )}
        </div>
    )
}

export default GenreDropdown