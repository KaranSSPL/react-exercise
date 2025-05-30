import { useState, useEffect } from 'react'

import GenreDropdown from './GenreDropdown';
import SortMedia from './SortMedia';

const Header = ({ searchTerm, onSearch,
    mediaType, onMediaTypeChange,
    onGenreSelect, selectedGenreId,
    onSortSelect, selectedSortId }) => {

    const [input, setInput] = useState(searchTerm);

    useEffect(() => {
        setInput(searchTerm);
    }, [searchTerm]);

    const searchMovieHandler = (e) => {
        e.preventDefault();
        onSearch(input.trim());
    };

    return (
        <>
            <header>
                <h1>🎬 Library</h1>
            </header>
            <div className="media-type">
                <form className="search-bar" onSubmit={searchMovieHandler}>
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        disabled={!!selectedSortId || !!selectedGenreId} />
                    <button type="submit" disabled={!!selectedSortId || !!selectedGenreId}>Search</button>
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
                    selectedGenreId={selectedGenreId}
                    disabled={!!selectedSortId} />

                <SortMedia onSortSelect={onSortSelect}
                    selectedSortId={selectedSortId}
                    disabled={!!selectedGenreId} />
            </div>
        </>
    )
}

export default Header;
