import { useState, useEffect } from 'react'

const Header = ({ searchMovie, onSearch }) => {
    const [input, setInput] = useState(searchMovie);

    const searchMovieHandler = (e) => {
        e.preventDefault();
        onSearch(input.trim());
    };

    useEffect(() => {
        setInput(searchMovie);
    }, [searchMovie]);

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
                <button className="movie-button">Movies</button>
                <button className="tv-series-button">TV Series</button>
            </div>
        </>
    )
}

export default Header;
