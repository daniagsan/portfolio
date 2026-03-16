import { useRef, useEffect } from 'react';

interface UseFloatingBotProps {
    domRef: React.RefObject<HTMLDivElement>;
    initialX: number;
    initialY: number;
    containerRef: React.RefObject<HTMLDivElement>;
    isHovered: boolean;
    onCollide: (x: number, y: number) => void;
}

export function useFloatingBot({
    domRef,
    initialX,
    initialY,
    containerRef,
    isHovered,
    onCollide
}: UseFloatingBotProps) {
    const posRef = useRef({ x: initialX, y: initialY });
    const velocity = useRef({ x: Math.random() > 0.5 ? 2 : -2, y: Math.random() > 0.5 ? 2 : -2 });
    const reqRef = useRef<number>();
    const onCollideRef = useRef(onCollide);

    // Keep the callback ref current without restarting the animation loop
    useEffect(() => { onCollideRef.current = onCollide; });

    useEffect(() => {
        if (isHovered) return;

        const update = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const botW = 120;
            const botH = 40;

            let nextX = posRef.current.x + velocity.current.x;
            let nextY = posRef.current.y + velocity.current.y;

            let collided = false;
            let colX = nextX;
            let colY = nextY;

            if (nextX <= 0) {
                nextX = 0;
                velocity.current.x *= -1;
                collided = true;
                colX = 0; colY = nextY + botH / 2;
            } else if (nextX + botW >= rect.width) {
                nextX = rect.width - botW;
                velocity.current.x *= -1;
                collided = true;
                colX = rect.width; colY = nextY + botH / 2;
            }

            if (nextY <= 0) {
                nextY = 0;
                velocity.current.y *= -1;
                collided = true;
                colX = nextX + botW / 2; colY = 0;
            } else if (nextY + botH >= rect.height) {
                nextY = rect.height - botH;
                velocity.current.y *= -1;
                collided = true;
                colX = nextX + botW / 2; colY = rect.height;
            }

            if (collided) {
                onCollideRef.current(colX, colY);
            }

            posRef.current = { x: nextX, y: nextY };

            // Imperative DOM update — bypasses React reconciler entirely
            if (domRef.current) {
                domRef.current.style.transform = `translate(${nextX}px, ${nextY}px)`;
            }

            reqRef.current = requestAnimationFrame(update);
        };

        reqRef.current = requestAnimationFrame(update);
        return () => {
            if (reqRef.current) cancelAnimationFrame(reqRef.current);
        };
    }, [isHovered, containerRef, domRef]);
}
