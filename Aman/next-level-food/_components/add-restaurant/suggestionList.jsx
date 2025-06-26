'use client';

const SuggestionList = ({ suggestions, onSelect, onMapSelect }) => {
    return (
        <ul style={{
            position: 'absolute',
            zIndex: 10,
            background: '#fff',
            border: '1px solid #ccc',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            width: '100%',
            maxHeight: '150px',
            overflowY: 'auto',
            color: '#000'
        }}>
            {suggestions.map((item, idx) => (
                <li key={idx} onClick={() => onSelect(item)} style={{ padding: '8px', cursor: 'pointer' }}>
                    {item.label}
                </li>
            ))}
            <li onClick={onMapSelect} style={{ padding: '8px', cursor: 'pointer' }}>
                <b>Select using map</b>
            </li>
        </ul>
    )
}

export default SuggestionList