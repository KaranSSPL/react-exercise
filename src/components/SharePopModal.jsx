import '../css/sharePopUpModal.css';

const SharePopModal = ({ sharePop, setSharePop }) => {

    const closeModal = () => {
        setSharePop(false);
    };

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

    if (!sharePop) return null;

    return sharePop && (<div className="modal-overlay">
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            <h3>Share this movie</h3>
            <p>Share with your friends!</p>
            <input type="text" readOnly value={window.location.href} onFocus={e => e.target.select()} className="share-link-input" />
            <button className="copy-btn" onClick={copyLink}>
                Copy Link
            </button>

            <div className="social-share-buttons">
                <button className="social-btn facebook" onClick={shareOnFacebook} aria-label="Share on Facebook" >
                    Facebook
                </button>

                <button className="social-btn twitter" onClick={shareOnTwitter} aria-label="Share on Twitter">
                    Twitter
                </button>

                <button className="social-btn whatsapp" onClick={shareOnWhatsapp} aria-label="Share on WhatsApp">
                    WhatsApp
                </button>
            </div>
        </div>
    </div>)
}

export default SharePopModal