import './PreviewFiles.css';
import RenderPreviewContent from './RenderPreviewContent';

type Preview = {
    type: string;
    data: string | ArrayBuffer | null | undefined;
    fileName: string;
};

interface IPreviewFiles {
    filePreviews: Preview[];
    setFilePreviews: (value: React.SetStateAction<Preview[]>) => void
}

const PreviewFiles: React.FC<IPreviewFiles> = ({ filePreviews, setFilePreviews }) => {

    const handleDelete = (index: number) => {
        setFilePreviews(prev => {
            const updated = prev.filter((_, i) => i !== index);
            const storedData = localStorage.getItem("myData");

            if (storedData) {
                if (updated.length === 0) {
                    localStorage.removeItem("myData");
                } else {
                    localStorage.setItem("myData", JSON.stringify(updated));
                }
            }

            return updated;
        })
    };

    return (
        filePreviews.map((item, index) => (
            <div key={index} className="previewItem">
                <button
                    onClick={() => handleDelete(index)}
                    className="deleteButton"
                    title="Delete file">
                    ✕
                </button>
                <RenderPreviewContent item={item} />
            </div>
        ))
    );
}

export default PreviewFiles