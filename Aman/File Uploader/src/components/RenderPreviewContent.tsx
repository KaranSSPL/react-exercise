interface IRenderPreviewContent {
    item: { type: string; data: string | ArrayBuffer | null | undefined; fileName: string; }
}

const RenderPreviewContent: React.FC<IRenderPreviewContent> = ({ item }) => {
    const fileExtension = item.fileName.split('.').pop()?.toLowerCase();

    return item.type.includes("image") || fileExtension === "svg" ? (
        <div className="preview">
            <img
                src={item.data as string}
                alt={item.fileName}
                className="previewContent" />
        </div>
    ) : (
        <div className="filePreview">
            <div className="fileIcon">{fileExtension}</div>
            <div className="fileName">{item.fileName}</div>
        </div>
    )
}

export default RenderPreviewContent