import { useState, useEffect, useRef } from 'react'
import { fetchGenreListOfMedia } from '../api';

const Header = ({ searchedMedia, onSearch, mediaType, onMediaTypeChange, onGenreSelect, selectedGenreId }) => {
    const [input, setInput] = useState(searchedMedia);
    const [genres, setGenres] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [fetchError, setFetchError] = useState("");
    const dropdownRef = useRef(null);
    const lastFetchedMediaTypeRef = useRef(null);


    useEffect(() => {
        setInput(searchedMedia);

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown, searchedMedia]);

    const searchMovieHandler = (e) => {
        e.preventDefault();
        onSearch(input.trim());
    };

    const toggleDropdown = async () => {
        const nextShow = !showDropdown;
        setShowDropdown(nextShow)

        if (nextShow && lastFetchedMediaTypeRef.current !== mediaType) {
            const response = await fetchGenreListOfMedia(mediaType);
            if (response?.status === 200) {
                setGenres(response.data.genres);
                setFetchError("");
                lastFetchedMediaTypeRef.current = mediaType;
            } else {
                const message = response?.response?.data?.status_message || "Unexpected error occurred.";
                setGenres([]);
                setFetchError(message);
            }
        }
    };

    const handleGenreClick = (genreId) => {
        onGenreSelect(genreId);
        setShowDropdown(false);
    };

    return (
        <>
            <header>
                <h1>🎬 Movie Library</h1>
            </header>
            <div className="media-type">
                <form className="search-bar" onSubmit={searchMovieHandler}>
                    <input type="text" placeholder="Search..." onChange={(e) => setInput(e.target.value)} value={input} />
                    <button type="submit">Search</button>
                </form>
                <button className={`movie-button ${mediaType === "movie" ? "active" : ""}`}
                    onClick={() => onMediaTypeChange("movie")}>
                    Movies
                </button>
                <button className={`tv-series-button ${mediaType === "tv" ? "active" : ""}`}
                    onClick={() => onMediaTypeChange("tv")}>
                    TV Series
                </button>

                <div className='dropdown' ref={dropdownRef}>
                    <button className="genre-button" onClick={toggleDropdown}>
                        {showDropdown ? "Hide Genres" : "Show Genres"}
                    </button>
                    {fetchError ? fetchError : (
                        showDropdown && (
                            <ul className="genre-dropdown">
                                <li onClick={() => handleGenreClick(null)}>Reset</li>
                                {
                                    genres.map((genre) => (
                                        <li key={genre.id} className={genre.id === selectedGenreId ? 'selected-genre' : ''} onClick={() => handleGenreClick(genre.id)}>{genre.name}</li>
                                    ))
                                }
                            </ul>
                        )
                    )}
                </div>
            </div>
        </>
    )
}

export default Header;
