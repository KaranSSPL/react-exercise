import styles from '../css/loader.module.css';

const Loader = () => {
    return (
        <div id={styles["loader-overlay"]}>
            <div className={styles.spinner}></div>
        </div>
    )
}

export default Loader