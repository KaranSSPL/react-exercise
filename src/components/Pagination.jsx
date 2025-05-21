import { useContext, useState } from "react";
import { MovieContext } from "../context/MovieContext";

const Pagination = () => {
    const { fetchMovies, page, search, searchMovies } = useContext(MovieContext);
    const [pageNumber, setPageNumber] = useState(1);

    const goToFirstPage = () => {
        setPageNumber(1);
        if (search) {
            searchMovies(1);
        } else {
            fetchMovies(1);
        }
    };

    const goToPreviousPage = () => {
        if (pageNumber > 1) {
            const prevPage = pageNumber - 1;
            setPageNumber(prevPage);
            if (search) {
                searchMovies(prevPage);
            } else {
                fetchMovies(prevPage);
            }
        }
    };

    const goToNextPage = () => {
        const nextPage = pageNumber + 1;
        if (nextPage <= page) {
            setPageNumber(nextPage);
            if (search) {
                searchMovies(nextPage);
            } else {
                fetchMovies(nextPage);
            }
        }
    };

    const goToLastPage = () => {
        setPageNumber(page);
        if (search) {
            searchMovies(page);
        } else {
            fetchMovies(page);
        }
    };
    return (
        <div className="pagination">
            <button onClick={goToFirstPage} disabled={pageNumber === 1}>First Page</button>
            <button onClick={goToPreviousPage} disabled={pageNumber === 1}>Previous</button>
            <span style={{ margin: '0 10px' }}>Page {pageNumber} of Total {page}</span>
            <button onClick={goToNextPage} disabled={pageNumber === page}>Next</button>
            <button onClick={goToLastPage} disabled={pageNumber === page}>Last Page</button>
        </div>
    )
}

export default Pagination;