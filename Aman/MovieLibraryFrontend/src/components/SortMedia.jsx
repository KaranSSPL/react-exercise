const genres = [{
    id: "popular",
    name: "Popular"
},
{
    id: "top_rated",
    name: "Top Rated"
}];

const SortMedia = ({ onSortSelect, selectedSortId, disabled }) => {
    const handleChange = (event) => {
        const value = event.target.value;
        onSortSelect(value === '' ? null : value);
    };

    return (
        <div className="sort-select-wrapper">
            <select className="sort-select" value={selectedSortId ?? ''} onChange={handleChange} disabled={disabled}>
                <option value="">Reset Sort</option>
                {genres.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SortMedia