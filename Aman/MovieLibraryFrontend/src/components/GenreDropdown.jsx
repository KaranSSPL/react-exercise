import { useState, useEffect, useRef } from 'react';
import { fetchGenreListOfMedia } from '../api';

const GenreDropdown = ({ mediaType, onGenreSelect, selectedGenreId }) => {
    const [genres, setGenres] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [fetchError, setFetchError] = useState('');
    const dropdownRef = useRef(null);
    const lastFetchedMediaTypeRef = useRef(null);

    useEffect(() => {
        if (!showDropdown) return;
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [showDropdown]);

    const toggleDropdown = () => {
        setShowDropdown((prev) => {
            const nextShow = !prev;
            if (nextShow && lastFetchedMediaTypeRef.current !== mediaType) {
                fetchGenreListOfMedia(mediaType).then((response) => {
                    if (response?.status === 200) {
                        setGenres(response.data.genres);
                        setFetchError('');
                        lastFetchedMediaTypeRef.current = mediaType;
                    } else {
                        const message = response?.response?.data?.status_message || 'Unexpected error occurred.';
                        setGenres([]);
                        setFetchError(message);
                    }
                });
            }
            return nextShow;
        });
    };

    const handleGenreClick = (genreId) => {
        onGenreSelect(genreId);
        setShowDropdown(false);
    };

    return (
        <div className='dropdown' ref={dropdownRef}>
            <button className="genre-button" onClick={toggleDropdown}>
                {showDropdown ? "Hide Genres" : "Show Genres"}
            </button>
            {fetchError ? (
                <div className="genre-error">{fetchError}</div>
            ) : (
                showDropdown && (
                    <ul className="genre-dropdown">
                        <li onClick={() => handleGenreClick(null)}>
                            Reset
                        </li>
                        {
                            genres.map((genre) => (
                                <li
                                    key={genre.id}
                                    className={genre.id === selectedGenreId ? 'selected-genre' : ''}
                                    onClick={() => handleGenreClick(genre.id)}>
                                    {genre.name}
                                </li>
                            ))
                        }
                    </ul>
                )
            )}
        </div>
    )
}

export default GenreDropdown