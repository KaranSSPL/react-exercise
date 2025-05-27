import styles from '../css/sharePopUpModal.module.css';

const ShareModal = ({ onClose }) => {
    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    };

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
            '_blank')
    };

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
            '_blank')
    };

    const shareOnWhatsapp = () => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`,
            '_blank')
    };

    return (
        <div className={styles["modal-overlay"]} onClick={onClose}>
            <div className={styles["modal-content"]} onClick={e => e.stopPropagation()}>
                <button className={styles["modal-close-btn"]} onClick={onClose}>&times;</button>
                <h3>Share this movie</h3>
                <input type="text" readOnly value={window.location.href} onFocus={e => e.target.select()} className={styles["share-link-input"]} />
                <button className={styles["copy-btn"]} onClick={copyLink}>
                    Copy Link
                </button>

                <div className={styles["social-share-buttons"]}>
                    <button className={`${styles["social-btn"]} ${styles.facebook}`} onClick={shareOnFacebook} aria-label="Share on Facebook" >
                        Facebook
                    </button>

                    <button className={`${styles["social-btn"]} ${styles.twitter}`} onClick={shareOnTwitter} aria-label="Share on Twitter">
                        Twitter
                    </button>

                    <button className={`${styles["social-btn"]} ${styles.whatsapp}`} onClick={shareOnWhatsapp} aria-label="Share on WhatsApp">
                        WhatsApp
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShareModal