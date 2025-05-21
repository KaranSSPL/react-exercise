import React, { useContext } from 'react'
import { MovieContext } from '../context/MovieContext.jsx';

const Header = () => {
    const { fetchMovies, searchMovies, search, setSearch } = useContext(MovieContext);

    const searchMovie = async (event) => {
        event.preventDefault();
        const searchQuery = search.trim();
        if (!searchQuery) return fetchMovies(1);

        searchMovies(1);
    }

    return (
        <>
            <header>
                <h1>🎬 Movie Library</h1>
            </header>
            <div className="search-bar">
                <input type="text" placeholder="Search for a movie..." onChange={(e) => setSearch(e.target.value)} value={search} />
                <button type='button' onClick={searchMovie}>Search</button>
            </div>
        </>
    )
}

export default Header;
