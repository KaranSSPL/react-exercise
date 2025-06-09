import React from 'react';

import { useEffect, useState } from "react";
import { createUseStyles } from 'react-jss';
import PreviewFiles from "./PreviewFiles";

const useStyles = createUseStyles({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '0',
        color: '#212529',
        wordWrap: 'break-word',
        backgroundColor: '#fff',
        backgroundClip: 'border-box',
        border: '1px solid rgba(0, 0, 0, 0.175)',
        borderRadius: '0.375rem',
        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
        margin: '0 auto',
        maxWidth: '700px',
    },
    'uploader-body': {
        flex: '1 1 auto',
        padding: '1rem'
    },
    heading: {
        marginBottom: '1.5rem',
        marginTop: '0',
        fontSize: '1.25rem',
        fontWeight: '500'
    },
    alert: {
        position: 'relative',
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        borderRadius: '0.375rem',
        '&.alert-warning': {
            color: '#664d03',
            backgroundColor: '#fff3cd !important',
            borderColor: '#ffe69c'
        },
        '&.alert-success': {
            color: '#0a3622',
            backgroundColor: '#d1e7dd  !important',
            borderColor: '#a3cfbb'
        }
    },
    'yes-no-buttons': {
        marginTop: '0.5rem',
    },
    'success-button': {
        marginRight: '0.5rem',
        display: 'inline-block',
        padding: '0.25rem 0.5rem',
        fontSize: '0.875rem',
        fontWeight: '400',
        lineHeight: '1.5',
        color: '#fff',
        textAlign: 'center',
        textDecoration: 'none',
        verticalAlign: 'middle',
        cursor: 'pointer',
        userSelect: 'none',
        border: '1px solid #198754',
        borderRadius: '0.25rem',
        backgroundColor: '#198754',
        transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out'
    },
    'danger-button': {
        display: 'inline-block',
        padding: '0.25rem 0.5rem',
        fontSize: '0.875rem',
        fontWeight: '400',
        lineHeight: '1.5',
        color: '#fff',
        textAlign: 'center',
        textDecoration: 'none',
        verticalAlign: 'middle',
        cursor: 'pointer',
        userSelect: 'none',
        border: '1px solid #dc3545',
        borderRadius: '0.25rem',
        backgroundColor: '#dc3545',
        transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out'
    },
    'drop-zone': {
        border: '2px dashed #aaa',
        padding: '40px',
        textAlign: 'center',
        color: '#aaa',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginBottom: '1rem',
        '&.dragover': {
            backgroundColor: '#eef6ff',
            borderColor: '#3399ff',
            color: '#3399ff'
        },
        '&:focus': {
            borderColor: '#2196f3',
            color: '#2196f3'
        }
    },
    'file-Input': {
        display: 'none'
    },
    previewGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        padding: '1rem 0'
    }
});

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
    const classes = useStyles();

    const handleDropZoneClick = () => {
        const input = document.getElementById("fileInput");
        input?.click();
    };

    const processSingleFile = async (file: File, onComplete?: (preview: Preview) => void) => {
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".txt", ".pdf"];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        if (!fileExtension || !allowedExtensions.includes(`.${fileExtension}`)) {
            setMessage(`File "${file.name}" is not allowed. Allowed types are: ${allowedExtensions.join(", ")}`);
            const timer = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(timer);
        }

        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > 6) {
            setMessage(`File "${file.name}" exceeds the maximum size of 6MB. Your file size is ${fileSizeInMB.toFixed(2)}MB.`);
            const timer = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(timer);
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
            const timer = setTimeout(() => setMessage(""), 3000);
            onComplete?.(preview);
            return () => clearTimeout(timer);
        };

        if (file.type.startsWith("image/") || fileExtension === 'svg') {
            reader.readAsDataURL(file);
        } else {
            reader.readAsText(file);
        }
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
    };

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
            onFileUpload?.(JSON.parse(storedData));
            setFilePreviews(JSON.parse(storedData));
        }
    }, [onFileUpload]);

    return (
        <div className={classes.container}>
            <div className={classes['uploader-body']}>
                <h5 className={classes.heading}>File Upload Manager</h5>
                {message && (
                    <div className={`${classes.alert} ${duplicateFiles.pending ? 'alert-warning' : 'alert-success'}`}>
                        {message}
                        {duplicateFiles.pending && (
                            <div className={classes['yes-no-buttons']}>
                                <button
                                    className={classes['success-button']}
                                    onClick={handleDuplicateConfirm}>
                                    Yes
                                </button>
                                <button
                                    className={classes['danger-button']}
                                    onClick={handleDuplicateCancel}>
                                    No
                                </button>
                            </div>
                        )}
                    </div>
                )}
                <div
                    className={`dropzone ${classes['drop-zone']} ${isDragging ? 'dragover' : ''}`}
                    id="dropZone"
                    onClick={handleDropZoneClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}>
                    {isDragging ? "Release to upload files" : "Drag & Drop files here or click to upload"}
                </div>
                <input type="file" id="fileInput" multiple className={classes['file-Input']} onChange={handleFiles} />
                {filePreviews && filePreviews.length > 0 &&
                    <div className={classes.previewGrid}>
                        <PreviewFiles filePreviews={filePreviews} setFilePreviews={setFilePreviews} />
                    </div>
                }
            </div>
        </div>
    )
}

export default FilesSave