interface ResultDisplayProps {
    result: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
    return (
        <div className="mt-4 text-center" id="result">
            {result}
        </div>
    )
}

export default ResultDisplay