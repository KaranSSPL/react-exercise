import { useContext } from 'react';
import { config } from '../global/globalVariables.js';
import axios from 'axios';
import { MovieContext } from '../MovieContext.jsx';

const MovieLists = () => {
    const { movies, setSelectedMovie, setShowModal } = useContext(MovieContext);

    const movieDetail = async (e, id) => {
        e.preventDefault();

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, config);
            console.log(response.data);
            setSelectedMovie(response.data);
            setShowModal(true);
        } catch (error) {
            console.error('Error while searching movie:', error);
        }
    };

    return (
        <>
            <div className="movie-grid">
                {
                    movies.map(item => (
                        <div role="button" className="movie-link" onClick={(e) => movieDetail(e, item.id)} key={item.id}>
                            <div className="movie-card">
                                <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} className="movie-poster" alt="Movie Poster" />
                                <div className="movie-info">
                                    <div className="movie-title">{item.title}</div>
                                    <div className="movie-release-date">{item.release_date}</div>
                                    <div className="movie-description">{item.overview.substring(0, 120)} <strong>read more</strong></div>
                                    <div className="movie-rating">⭐ {item.vote_average}</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default MovieLists;