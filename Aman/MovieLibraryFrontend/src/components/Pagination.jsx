const Pagination = ({ currentPage, totalPage, onPageChange }) => {
    return (
        <div className="pagination">
            <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>First Page</button>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <span style={{ margin: '0 10px' }}>Page {currentPage} of Total {totalPage}</span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPage}>Next</button>
            <button onClick={() => onPageChange(totalPage)} disabled={currentPage === totalPage}>Last Page</button>
        </div>
    )
}

export default Pagination;