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
    const [duplicateFiles, setDuplicateFiles] = useState<{
        files: File[];
        pending: boolean;
    }>({ files: [], pending: false });

    const handleDropZoneClick = () => {
        const input = document.getElementById("fileInput");
        input?.click();
    };

    const processFiles = (files: FileList | File[]) => {
        let pendingFiles = Array.from(files).length;
        const processedFiles: Preview[] = [];
        const duplicates: File[] = [];

        Array.from(files).forEach((file) => {
            const isDuplicate = filePreviews.some(preview => preview.fileName === file.name);
            if (isDuplicate) {
                duplicates.push(file);
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

        if (duplicates.length > 0) {
            setDuplicateFiles({ files: duplicates, pending: true });
            const fileNames = duplicates.map(f => `"${f.name}"`).join(", ");
            setMessage(`File ${fileNames} already exists. Do you want to store it again?`);
        }
    }

    const processSingleFile = async (file: File, onComplete?: (preview: Preview) => void) => {
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".txt", ".pdf"];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        if (!fileExtension || !allowedExtensions.includes(`.${fileExtension}`)) {
            setMessage(`File "${file.name}" is not allowed. Allowed types are: ${allowedExtensions.join(", ")}`);
            setTimeout(() => setMessage(""), 4000);
            return;
        }

        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > 6) {
            setMessage(`File "${file.name}" exceeds the maximum size of 6MB. Your file size is ${fileSizeInMB.toFixed(2)}MB.`);
            setTimeout(() => setMessage(""), 4000);
            return;
        }

        const reader = new FileReader();

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
            }, 4000);

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
        if (duplicateFiles.files.length > 0) {
            let pendingFiles = duplicateFiles.files.length;
            const processedFiles: Preview[] = [];

            duplicateFiles.files.forEach((file) => {
                processSingleFile(file, (newPreview) => {
                    processedFiles.push(newPreview);
                    pendingFiles--;
                    if (pendingFiles === 0) {
                        const allFiles = [...filePreviews, ...processedFiles];
                        onFileUpload?.(allFiles);
                    }
                });
            })
        }
        setDuplicateFiles({ files: [], pending: false });
    };

    const handleDuplicateCancel = () => {
        setDuplicateFiles({ files: [], pending: false });
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
                    <div className={`alert ${duplicateFiles.pending ? 'alert-warning' : 'alert-success'}`}>
                        {message}
                        {duplicateFiles.pending && (
                            <div className="mt-2">
                                <button
                                    className="btn btn-sm btn-success me-2"
                                    onClick={handleDuplicateConfirm}>
                                    Yes
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={handleDuplicateCancel}>
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