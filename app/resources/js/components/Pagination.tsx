type Props = {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
    ariaLabel?: string;
};

function pageItems(current: number, last: number): Array<number | '…'> {
    const delta = 2;
    const range: number[] = [];

    for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || (i >= current - delta && i <= current + delta)) {
            range.push(i);
        }
    }

    const items: Array<number | '…'> = [];
    let prev = 0;
    for (const i of range) {
        if (prev && i - prev > 1) items.push('…');
        items.push(i);
        prev = i;
    }
    return items;
}

export function Pagination({ currentPage, lastPage, onPageChange, ariaLabel = 'Pagination' }: Props) {
    if (lastPage <= 1) {
        return null;
    }

    return (
        <nav className="mt-4" aria-label={ariaLabel}>
            <ul className="pagination justify-content-center mb-0">
                <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)} type="button">
                        Prev
                    </button>
                </li>

                {pageItems(currentPage, lastPage).map((item, idx) => {
                    if (item === '…') {
                        return (
                            <li key={`dots-${idx}`} className="page-item disabled">
                                <span className="page-link">…</span>
                            </li>
                        );
                    }
                    const p = item;
                    return (
                        <li key={p} className={`page-item ${p === currentPage ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => onPageChange(p)} type="button">
                                {p}
                            </button>
                        </li>
                    );
                })}

                <li className={`page-item ${currentPage >= lastPage ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)} type="button">
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

