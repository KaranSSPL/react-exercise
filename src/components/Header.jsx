import React, { useContext, useState } from 'react'
import { config } from '../global/globalVariables.js';
import axios from 'axios';
import { MovieContext } from '../MovieContext.jsx';

const Header = () => {
    const [search, setSearch] = useState("");
    const { setMovies } = useContext(MovieContext);

    const searchMovie = async (event) => {
        event.preventDefault();
        const searchQuery = search.trim();
        if (!searchQuery) return;

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=1`, config);
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error while searching movie:', error);
        }
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
