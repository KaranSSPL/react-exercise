import { useState, useEffect } from 'react'

import GenreDropdown from './GenreDropdown';

const Header = ({ searchedMedia, onSearch, mediaType, onMediaTypeChange, onGenreSelect, selectedGenreId }) => {
    const [input, setInput] = useState(searchedMedia);


    useEffect(() => {
        setInput(searchedMedia);
    }, [searchedMedia]);

    const searchMovieHandler = (e) => {
        e.preventDefault();
        onSearch(input.trim());
    };

    return (
        <>
            <header>
                <h1>🎬 Movie Library</h1>
            </header>
            <div className="media-type">
                <form className="search-bar" onSubmit={searchMovieHandler}>
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setInput(e.target.value)}
                        value={input} />
                    <button type="submit">Search</button>
                </form>

                <button
                    className={`movie-button ${mediaType === "movie" ? "active" : ""}`}
                    onClick={() => onMediaTypeChange("movie")}>
                    Movies
                </button>

                <button
                    className={`tv-series-button ${mediaType === "tv" ? "active" : ""}`}
                    onClick={() => onMediaTypeChange("tv")}>
                    TV Series
                </button>

                <GenreDropdown
                    mediaType={mediaType}
                    onGenreSelect={onGenreSelect}
                    selectedGenreId={selectedGenreId} />
            </div>
        </>
    )
}

export default Header;
