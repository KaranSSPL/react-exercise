import { useEffect, useState } from 'react';
import styles from '../css/sharePopUpModal.module.css';

const ShareModal = ({ onClose }) => {
    const [errors, setErrors] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 5000);
            }).catch(() => setErrors("Failed to copy the link."));
    };

    const shareData = {
        title: "Check out this movie!",
        text: "You've got to see this one!",
        url: window.location.href,
    };

    const fallbackUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`,
    };

    const handleShare = async (platform) => {
        setErrors("");
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                onClose();
                return;
            } catch (error) {
                setErrors(`Error sharing: ${error}`);
            }
        }
        const url = fallbackUrls[platform];
        if (url) {
            window.open(url, '_blank');
        } else {
            setErrors('Unsupported sharing option.');
        }
    };

    return (
        <div className={styles["modal-overlay"]} onClick={onClose}>
            <div className={styles["modal-content"]} onClick={e => e.stopPropagation()}>
                <button className={styles["modal-close-btn"]} onClick={onClose}>&times;</button>
                <h3>Share this movie</h3>
                {errors && (
                    <div className={styles.error}>
                        {errors}
                    </div>
                )}
                {copied && (
                    <div className={styles.success}>
                        Link copied to clipboard!
                    </div>
                )}
                <input type="text" readOnly value={window.location.href} onFocus={e => e.target.select()} className={styles["share-link-input"]} />
                <button className={styles["copy-btn"]} onClick={copyLink}>
                    Copy Link
                </button>

                <div className={styles["social-share-buttons"]}>
                    <button className={`${styles["social-btn"]} ${styles.facebook}`} onClick={() => handleShare("facebook")} aria-label="Share on Facebook" >
                        Facebook
                    </button>

                    <button className={`${styles["social-btn"]} ${styles.twitter}`} onClick={() => handleShare("twitter")} aria-label="Share on Twitter">
                        Twitter
                    </button>

                    <button className={`${styles["social-btn"]} ${styles.whatsapp}`} onClick={() => handleShare("whatsapp")} aria-label="Share on WhatsApp">
                        WhatsApp
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShareModal