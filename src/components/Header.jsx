import React, { useState } from 'react'
import { config } from '../global/globalVariables.js';
import axios from 'axios';

const Header = ({ setMovies }) => {
    const [search, setSearch] = useState("");
    const searchMovie = async (event) => {
        event.preventDefault();
        if (!search) return;

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&page=1`, config);
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
            <input type="text" placeholder="Search for a movie..." onChange={(e) => setSearch(e.target.value.trim())} value={search} />
            <button type='button' onClick={searchMovie}>Search</button>
            </div>
        </>
    )
}

export default Header;
