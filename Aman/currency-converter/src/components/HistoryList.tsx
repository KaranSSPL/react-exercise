interface HistoryListProps {
    history: string[];
}

const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
    return (
        <div className="mt-4">
            <h5>Conversion History</h5>
            <div>
                {history.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </div>
    )
}

export default HistoryList