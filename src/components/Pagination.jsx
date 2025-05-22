const Pagination = ({ currentPageNumber, totalPage, onPageChange }) => {
    return (
        <div className="pagination">
            <button onClick={() => onPageChange(1)} disabled={currentPageNumber === 1}>First Page</button>
            <button onClick={() => onPageChange(currentPageNumber - 1)} disabled={currentPageNumber === 1}>Previous</button>
            <span style={{ margin: '0 10px' }}>Page {currentPageNumber} of Total {totalPage}</span>
            <button onClick={() => onPageChange(currentPageNumber + 1)} disabled={currentPageNumber === totalPage}>Next</button>
            <button onClick={() => onPageChange(totalPage)} disabled={currentPageNumber === totalPage}>Last Page</button>
        </div>
    )
}

export default Pagination;