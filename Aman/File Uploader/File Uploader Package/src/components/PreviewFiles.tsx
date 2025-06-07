import React from 'react';

import { createUseStyles } from 'react-jss';
import RenderPreviewContent from './RenderPreviewContent';

const useStyles = createUseStyles({
    previewItem: {
        position: 'relative',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        overflow: 'hidden',
        aspectRatio: '1'
    },
    deleteButton: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: 'rgba(255, 255, 255, 0.9)',
        border: 'none',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: '0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 1,
        '&:hover': {
            background: 'rgba(255, 255, 255, 1)'
        }
    }
});

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
    const classes = useStyles();
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
            <div key={index} className={classes.previewItem}>
                <button
                    onClick={() => handleDelete(index)}
                    className={classes.deleteButton}
                    title="Delete file">
                    ✕
                </button>
                <RenderPreviewContent item={item} />
            </div>
        ))
    );
}

export default PreviewFiles