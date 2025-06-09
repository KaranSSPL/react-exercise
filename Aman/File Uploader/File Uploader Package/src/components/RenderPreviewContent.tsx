import React from 'react';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    preview: {
        width: '100%',
        height: '100%',
        padding: '1rem',
        background: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    previewContent: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain'
    },
    filePreview: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: '#f8f9fa'
    },
    fileIcon: {
        marginBottom: '0.5rem',
        color: '#dc3545'
    },
    fileName: {
        fontSize: '0.875rem',
        textAlign: 'center',
        wordBreak: 'break-word',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box'
    }
});

interface IRenderPreviewContent {
    item: { type: string; data: string | ArrayBuffer | null | undefined; fileName: string; }
}

const RenderPreviewContent: React.FC<IRenderPreviewContent> = ({ item }) => {
    const classes = useStyles();
    const fileExtension = item.fileName.split('.').pop()?.toLowerCase();

    return item.type.includes("image") || fileExtension === "svg" ? (
        <div className={classes.preview}>
            <img
                src={item.data as string}
                alt={item.fileName}
                className={classes.previewContent} />
        </div>
    ) : (
        <div className={classes.filePreview}>
            <div className={classes.fileIcon}>{fileExtension}</div>
            <div className={classes.fileName}>{item.fileName}</div>
        </div>
    )
}

export default RenderPreviewContent