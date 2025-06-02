const Pagination = ({ currentPage, totalPage, onPageChange }) => {
    return (
        <div className="pagination">
            <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>&#10094;&#10094;</button>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>&#10094;</button>
            <span>Page {currentPage} of Total {totalPage}</span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPage}>&#10095;</button>
            <button onClick={() => onPageChange(totalPage)} disabled={currentPage === totalPage}>&#10095;&#10095;</button>
        </div>
    )
}

export default Pagination;