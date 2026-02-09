import { useCallback, useMemo, useState } from 'react';

type ModalState = {
    show: boolean;
    title: string;
    body: string;
};

export function useErrorModal(defaultTitle = 'Error') {
    const [modal, setModal] = useState<ModalState>({
        show: false,
        title: defaultTitle,
        body: '',
    });

    const close = useCallback(() => {
        setModal((s) => ({ ...s, show: false }));
    }, []);

    const showError = useCallback(
        (message: string, title?: string) => {
            setModal({
                show: true,
                title: title ?? defaultTitle,
                body: message,
            });
        },
        [defaultTitle]
    );

    const modalProps = useMemo(
        () => ({
            show: modal.show,
            title: modal.title,
            body: modal.body,
            onClose: close,
        }),
        [close, modal.body, modal.show, modal.title]
    );

    return { modalProps, showError, close };
}

