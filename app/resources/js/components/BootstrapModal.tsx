type Props = {
    show: boolean;
    title: string;
    body: string;
    onClose: () => void;
    closeText?: string;
};

export function BootstrapModal({ show, title, body, onClose, closeText = 'Close' }: Props) {
    if (!show) {
        return null;
    }

    return (
        <>
            <div
                className="modal show"
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                style={{ display: 'block' }}
                onClick={onClose}
            >
                <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
                        </div>
                        <div className="modal-body">
                            <p className="mb-0">{body}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                {closeText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show" onClick={onClose} />
        </>
    );
}

