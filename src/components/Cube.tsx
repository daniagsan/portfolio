import { useRef, useEffect, useCallback, useState } from 'react';

const DAMPING = 0.97;
const MIN_VELOCITY = 0.05;
const FLOAT_AMPLITUDE = 8;
const FLOAT_SPEED = 0.002;
const CUBE_SIZE = 300;

const FACES: { label: string; transform: string; bg: string }[] = [
    { label: 'FRONT', transform: `translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgba(0,0,0,0.88)' },
    { label: 'BACK', transform: `rotateY(180deg) translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgba(0,0,0,0.82)' },
    { label: 'RIGHT', transform: `rotateY(90deg) translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgba(0,0,0,0.78)' },
    { label: 'LEFT', transform: `rotateY(-90deg) translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgba(0,0,0,0.85)' },
    { label: 'TOP', transform: `rotateX(90deg) translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgba(0,0,0,0.75)' },
    { label: 'BOTTOM', transform: `rotateX(-90deg) translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgba(0,0,0,0.9)' },
];

export default function Cube() {
    const cubeRef = useRef<HTMLDivElement>(null);
    const stateRef = useRef({
        rotX: -25,
        rotY: 35,
        velX: 0,
        velY: 0.3,
        isDragging: false,
        lastPointerX: 0,
        lastPointerY: 0,
        lastPointerTime: 0,
        floatOffset: 0,
        animId: 0,
    });
    const [isDragging, setIsDragging] = useState(false);

    const animate = useCallback(() => {
        const s = stateRef.current;
        const now = performance.now();

        if (!s.isDragging) {
            // Apply velocity with damping
            s.rotX += s.velX;
            s.rotY += s.velY;
            s.velX *= DAMPING;
            s.velY *= DAMPING;

            // Stop when velocity is negligible
            if (Math.abs(s.velX) < MIN_VELOCITY) s.velX = 0;
            if (Math.abs(s.velY) < MIN_VELOCITY) s.velY = 0;

            // Idle spin when fully stopped
            if (s.velX === 0 && s.velY === 0) {
                s.velY = 0.15;
            }
        }

        // Floating bob
        s.floatOffset = Math.sin(now * FLOAT_SPEED) * FLOAT_AMPLITUDE;

        if (cubeRef.current) {
            cubeRef.current.style.transform =
                `translateY(${s.floatOffset}px) rotateX(${s.rotX}deg) rotateY(${s.rotY}deg)`;
        }

        s.animId = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        stateRef.current.animId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(stateRef.current.animId);
    }, [animate]);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        const s = stateRef.current;
        s.isDragging = true;
        s.lastPointerX = e.clientX;
        s.lastPointerY = e.clientY;
        s.lastPointerTime = performance.now();
        s.velX = 0;
        s.velY = 0;
        setIsDragging(true);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        const s = stateRef.current;
        if (!s.isDragging) return;

        const dx = e.clientX - s.lastPointerX;
        const dy = e.clientY - s.lastPointerY;

        s.rotY += dx * 0.4;
        s.rotX -= dy * 0.4;

        s.lastPointerX = e.clientX;
        s.lastPointerY = e.clientY;
        s.lastPointerTime = performance.now();

        // Track velocity from recent movement
        s.velY = dx * 0.3;
        s.velX = -dy * 0.3;
    }, []);

    const onPointerUp = useCallback(() => {
        stateRef.current.isDragging = false;
        setIsDragging(false);
    }, []);

    return (
        <div
            className="select-none"
            style={{
                perspective: 800,
                perspectiveOrigin: '50% 50%',
                width: CUBE_SIZE,
                height: CUBE_SIZE,
            }}
        >
            <div
                ref={cubeRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                className="relative w-full h-full"
                style={{
                    transformStyle: 'preserve-3d',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    touchAction: 'none',
                }}
            >
                {FACES.map((face) => (
                    <div
                        key={face.label}
                        className="absolute inset-0 flex items-center justify-center border border-white/10 font-mono text-[10px] tracking-[0.2em] text-white/40 backface-visible"
                        style={{
                            transform: face.transform,
                            background: face.bg,
                            backfaceVisibility: 'visible',
                        }}
                    >
                        {face.label}
                    </div>
                ))}
            </div>
        </div>
    );
}
