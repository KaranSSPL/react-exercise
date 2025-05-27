import styles from '../css/notfound.module.css';

const NotFound = () => {
    return (
        <div className={styles["no-data-container"]}>
            <h2>No Movies Found</h2>
        </div>
    )
}

export default NotFound