import { useEffect, useState } from "react";
import PreviewFiles from "./PreviewFiles";

type Preview = {
    type: string;
    data: string | ArrayBuffer | null | undefined;
    fileName: string;
};

interface IFilesSave {
    onFileUpload?: (files: Preview[]) => void;
}

const FilesSave: React.FC<IFilesSave> = ({ onFileUpload }) => {
    const [filePreviews, setFilePreviews] = useState<Preview[]>([]);
    const [message, setMessage] = useState<string>("");
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [duplicateFile, setDuplicateFile] = useState<{
        file: File | null;
        pending: boolean;
    }>({ file: null, pending: false });

    const handleDropZoneClick = () => {
        const input = document.getElementById("fileInput");
        input?.click();
    };

    const processFiles = (files: FileList | File[]) => {
        let pendingFiles = Array.from(files).length;
        const processedFiles: Preview[] = [];

        Array.from(files).forEach((file) => {
            const isDuplicate = filePreviews.some(preview => preview.fileName === file.name);
            if (isDuplicate) {
                setDuplicateFile({ file, pending: true });
                setMessage(`File "${file.name}" already exists. Do you want to store it again?`);
                pendingFiles--;
            } else {
                processSingleFile(file, (newPreview) => {
                    processedFiles.push(newPreview);
                    pendingFiles--;
                    if (pendingFiles === 0) {
                        const allFiles = [...filePreviews, ...processedFiles];
                        onFileUpload?.(allFiles);
                    }
                });
            }
        });
    }

    const processSingleFile = (file: File, onComplete?: (preview: Preview) => void) => {
        const reader = new FileReader();
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        reader.onload = (ev) => {
            const fileType = file.type;
            const preview = { type: fileType, data: ev.target?.result, fileName: file.name };

            setFilePreviews(prev => {
                const update = [...prev, preview];
                localStorage.setItem("myData", JSON.stringify(update));
                return update;
            });
            setMessage("File uploaded successfully!");
            setTimeout(() => {
                setMessage("");
            }, 2000);

            onComplete?.(preview);
        };

        if (file.type.startsWith("image/") || fileExtension === 'svg') {
            reader.readAsDataURL(file);
        } else {
            reader.readAsText(file);
        }
    }

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        processFiles(files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length === 0) return;
        processFiles(files);
    };

    const handleDuplicateConfirm = () => {
        if (duplicateFile.file) {
            processSingleFile(duplicateFile.file, (newPreview) => {
                const allFiles = [...filePreviews, newPreview];
                onFileUpload?.(allFiles);
            });
        }
        setDuplicateFile({ file: null, pending: false });
    };

    const handleDuplicateCancel = () => {
        setDuplicateFile({ file: null, pending: false });
        setMessage("");
    };

    useEffect(() => {
        const storedData = localStorage.getItem('myData');
        if (storedData) {
            setFilePreviews(JSON.parse(storedData));
        }
        setMessage("");
    }, [])

    return (
        <div className="card shadow mx-auto" style={{ "maxWidth": "700px" }}>
            <div className="card-body">
                <h5 className="card-title mb-4">File Upload Manager</h5>
                {message && (
                    <div className={`alert ${duplicateFile.pending ? 'alert-warning' : 'alert-success'}`}>
                        {message}
                        {duplicateFile.pending && (
                            <div className="mt-2">
                                <button
                                    className="btn btn-sm btn-success me-2"
                                    onClick={handleDuplicateConfirm}
                                >
                                    Yes
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={handleDuplicateCancel}
                                >
                                    No
                                </button>
                            </div>
                        )}
                    </div>
                )}
                <div
                    className={`dropzone drop-zone mb-3 ${isDragging ? 'dragover' : ''}`}
                    id="dropZone"
                    onClick={handleDropZoneClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}>
                    {isDragging ? "Release to upload files" : "Drag & Drop files here or click to upload"}
                </div>
                <input type="file" id="fileInput" multiple className="form-control d-none" onChange={handleFiles} />
                {filePreviews && filePreviews.length > 0 &&
                    <div className="previewGrid">
                        <PreviewFiles filePreviews={filePreviews} setFilePreviews={setFilePreviews} />
                    </div>
                }
            </div>
        </div>
    )
}

export default FilesSave