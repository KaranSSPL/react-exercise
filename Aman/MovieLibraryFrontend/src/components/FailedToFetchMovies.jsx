const FailedToFetchMovies = ({ message }) => {
    return (
        <div className="no-data-container">
            <h2>{message}</h2>
        </div>
    )
}

export default FailedToFetchMovies