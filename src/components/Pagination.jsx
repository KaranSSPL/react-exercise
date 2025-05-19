import { useContext, useState } from "react";
import { MovieContext } from "../MovieContext";

const Pagination = () => {
    const { fetchMovies } = useContext(MovieContext);
    const [pageNumber, setPageNumber] = useState(1);
    const goToNextPage = () => {
        const nextPage = pageNumber + 1;
        setPageNumber(nextPage);
        fetchMovies(nextPage);
    };

    const goToPreviousPage = () => {
        if (pageNumber > 1) {
            const prevPage = pageNumber - 1;
            setPageNumber(prevPage);
            fetchMovies(prevPage);
        }
    };
    return (
        <div className="pagination">
            <button onClick={goToPreviousPage} disabled={pageNumber === 1}>Previous</button>
            <span style={{ margin: '0 10px' }}>Page {pageNumber}</span>
            <button onClick={goToNextPage}>Next</button>
        </div>
    )
}

export default Pagination;