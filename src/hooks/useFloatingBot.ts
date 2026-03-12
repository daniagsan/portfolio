import { useState, useRef, useEffect } from 'react';

interface UseFloatingBotProps {
    initialX: number;
    initialY: number;
    containerRef: React.RefObject<HTMLDivElement>;
    isHovered: boolean;
    onCollide: (x: number, y: number) => void;
}

export function useFloatingBot({
    initialX,
    initialY,
    containerRef,
    isHovered,
    onCollide
}: UseFloatingBotProps) {
    const [pos, setPos] = useState({ x: initialX, y: initialY });
    const velocity = useRef({ x: Math.random() > 0.5 ? 2 : -2, y: Math.random() > 0.5 ? 2 : -2 });
    const reqRef = useRef<number>();

    useEffect(() => {
        if (isHovered) return;

        const update = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const botW = 120;
            const botH = 40;

            let nextX = pos.x + velocity.current.x;
            let nextY = pos.y + velocity.current.y;

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
                onCollide(colX, colY);
            }

            setPos({ x: nextX, y: nextY });
            reqRef.current = requestAnimationFrame(update);
        };

        reqRef.current = requestAnimationFrame(update);
        return () => {
            if (reqRef.current) cancelAnimationFrame(reqRef.current);
        };
    }, [pos, isHovered, containerRef, onCollide]);

    return pos;
}
