function MovieDetail({ movie, setShowModal,showModal }) {
    if (!movie) return null;

    const closeModal = () => {
        setShowModal(false);
    }

    const handleShare = (e, detail) => {
        e.preventDefault();
        console.log(detail);
        return;
    }

    return (
        <>
            <div id="movieModal" className="modal" style={!showModal ? { display: 'none' } : {}}>
                {/* Movie Detail Modal */}
                <div className="modal-content">
                    <span className="modal-close" onClick={closeModal}>&times;</span>
                    <div className="modal-poster">
                        <img id="modalBackground" src={`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`} alt="Background Poster" />
                    </div>
                    <div className="modal-details">
                        <img id="modalPoster" src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="Movie Poster" />
                        <div className="modal-info">
                            <h2 id="modalTitle">{movie.original_title}</h2>
                            <p id="modalRelease">{movie.release_date}</p>
                            <p id="modalRating">⭐ {movie.vote_average}</p>

                            {/* Genres */}
                            <div id="modalGenres">
                                <strong>Genres</strong>
                                <ul className="genres-lists">
                                    {movie.genres.map(item => (
                                        <li className="list-of-genre" key={item.id}>
                                            <span className="genre-badge">{item.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <p id="modalDescription">{movie.overview}</p>
                        </div>
                    </div>

                    {/* ✅ Share Button */}
                    <div className="modal-actions">
                        <button onClick={(e) => handleShare(e, movie)} className="share-button">
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetail;