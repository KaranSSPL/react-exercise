const ReviewCard = ({ item, styles }) => {
    return (
        <div className={styles["review-card"]}>
            <div className={styles["review-header"]}>
                <span className={styles["review-username"]}>
                    {`${item.firstName} ${item.lastName}`}
                </span>
                <span className={styles["review-date"]}>
                    {new Date(item.createdDate).toLocaleDateString()}
                </span>
            </div>
            <div className={styles["review-content"]}>
                <p>{item.comment}</p>
            </div>
        </div>
    )
}

export default ReviewCard