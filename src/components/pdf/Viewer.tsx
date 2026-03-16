// src/components/pdf/ImageViewer.tsx
import { useState } from 'react';

interface ImageViewerProps {
    pages: string[];
    title: string;
}

export const ImageViewer = ({ pages, title }: ImageViewerProps) => {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent(p => Math.max(0, p - 1));
    const next = () => setCurrent(p => Math.min(pages.length - 1, p + 1));

    return (
        <section className="flex flex-col gap-3 w-full min-h-0 flex-1">
            <div className="flex-1 min-h-0">
                <img
                    key={current}
                    src={pages[current]}
                    alt={`Página ${current + 1} de ${title}`}
                    className="w-full h-full object-contain border border-black/10 shadow-md"
                />
            </div>

            <div className="flex items-center justify-between flex-shrink-0">
                <button
                    onClick={prev}
                    disabled={current === 0}
                    className="px-4 py-1.5 border-2 border-black font-mono text-xs uppercase tracking-widest font-bold bg-white hover:bg-black hover:text-white transition-colors disabled:opacity-25 disabled:pointer-events-none"
                >
                    ← Prev
                </button>
                <span className="font-mono text-xs text-black/50">
                    {current + 1} / {pages.length}
                </span>
                <button
                    onClick={next}
                    disabled={current === pages.length - 1}
                    className="px-4 py-1.5 border-2 border-black font-mono text-xs uppercase tracking-widest font-bold bg-white hover:bg-black hover:text-white transition-colors disabled:opacity-25 disabled:pointer-events-none"
                >
                    Next →
                </button>
            </div>
        </section>
    );
};
