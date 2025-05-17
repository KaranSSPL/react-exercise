import { useEffect, useState } from "react";
import { config, apiKey } from './global/globalVariables.js';
import axios from 'axios';
import MovieLists from './components/MovieLists.jsx';
import MovieDetail from './components/MovieDetail.jsx';
import Header from "./components/Header.jsx";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async (pageNumber = 1) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${pageNumber}&api_key=${apiKey}`,
                config
            );
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    return (
        <>
            <Header setMovies={setMovies} />
            <MovieLists movies={movies} setSelectedMovie={setSelectedMovie} setShowModal={setShowModal} />
            <MovieDetail movie={selectedMovie} setShowModal={setShowModal} showModal={showModal} />
        </>
    )
}

export default App;
