interface ConvertButtonProps {
    onClick: () => void;
    isLoading: boolean;
}

const ConvertButton: React.FC<ConvertButtonProps> = ({ onClick, isLoading }) => {
    return (
        <div className="d-grid">
            <button
                className="btn btn-primary"
                onClick={onClick}
                disabled={isLoading}>
                {isLoading ? (
                    <>
                        <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                        ></span>
                        Please wait...
                    </>
                ) : (
                    'Convert'
                )}
            </button>
        </div>
    );
};

export default ConvertButton;