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
            <form className="search-bar" onSubmit={searchMovieHandler}>
                <input type="text" placeholder="Search for a movie..." onChange={(e) => setInput(e.target.value)} value={input} />
                <button type="submit">Search</button>
            </form>
        </>
    )
}

export default Header;
