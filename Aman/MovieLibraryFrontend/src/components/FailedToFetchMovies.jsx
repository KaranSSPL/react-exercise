import styles from '../css/notfound.module.css';

const FailedToFetchMovies = ({ message }) => {
    return (
        <div className={styles["no-data-container"]}>
            <h2>{message}</h2>
        </div>
    )
}

export default FailedToFetchMovies