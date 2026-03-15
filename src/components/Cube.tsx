import { useRef, useEffect, useCallback, useState } from 'react';
import { projectsData } from '../data/mockData';

const DAMPING = 0.97;
const MIN_VELOCITY = 0.05;
const FLOAT_AMPLITUDE = 8;
const FLOAT_SPEED = 0.002;
const CUBE_SIZE = 270;

const getActiveFace = (rotX: number, rotY: number) => {
    const radX = (rotX * Math.PI) / 180;
    const radY = (rotY * Math.PI) / 180;

    const faces = [
        { id: 0, z: Math.cos(radX) * Math.cos(radY) },           // Front
        { id: 1, z: -Math.cos(radX) * Math.cos(radY) },          // Back
        { id: 2, z: -Math.cos(radX) * Math.sin(radY) },          // Right
        { id: 3, z: Math.cos(radX) * Math.sin(radY) },           // Left
        { id: 4, z: -Math.sin(radX) },                           // Top
        { id: 5, z: Math.sin(radX) },                            // Bottom
    ];

    return faces.reduce((prev, curr) => (curr.z > prev.z ? curr : prev)).id;
};

const FACE_CONFIGS = [
    { transform: `translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgba(0,0,0,0.85)' },
    { transform: `rotateY(180deg) translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgba(0,0,0,0.82)' },
    { transform: `rotateY(90deg) translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgba(0,0,0,0.78)' },
    { transform: `rotateY(-90deg) translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgba(0,0,0,0.85)' },
    { transform: `rotateX(90deg) translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgba(0,0,0,0.75)' },
    { transform: `rotateX(-90deg) translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgba(0,0,0,0.9)' },
];

export default function Cube({ onPinChange }: { onPinChange?: (pinned: boolean, activeIndex: number) => void }) {
    const cubeRef = useRef<HTMLDivElement>(null);
    const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
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
    const [isPinned, setIsPinned] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isCharging, setIsCharging] = useState(false);

    useEffect(() => {
        onPinChange?.(isPinned, activeIndex);
    }, [isPinned, activeIndex, onPinChange]);

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

            // Idle spin when fully stopped (disable or slow down when pinned)
            if (s.velX === 0 && s.velY === 0) {
                s.velY = isPinned ? 0 : 0.15;
            }
        }

        // Floating bob
        const amplitude = isPinned ? FLOAT_AMPLITUDE / 2 : FLOAT_AMPLITUDE;
        s.floatOffset = Math.sin(now * FLOAT_SPEED) * amplitude;

        if (cubeRef.current) {
            cubeRef.current.style.transform =
                `translateY(${s.floatOffset}px) rotateX(${s.rotX}deg) rotateY(${s.rotY}deg)`;
        }

        s.animId = requestAnimationFrame(animate);
    }, [isPinned]);

    useEffect(() => {
        stateRef.current.animId = requestAnimationFrame(animate);
        return () => {
            if (stateRef.current.animId) cancelAnimationFrame(stateRef.current.animId);
            if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
        };
    }, [animate]);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        if (isPinned) {
            stateRef.current.isDragging = false;
            setIsDragging(false);
            setIsPinned(false);
            return;
        }

        e.preventDefault();
        const s = stateRef.current;
        s.isDragging = true;
        s.lastPointerX = e.clientX;
        s.lastPointerY = e.clientY;
        s.lastPointerTime = performance.now();
        s.velX = 0;
        s.velY = 0;
        setIsDragging(true);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

        // Start charging immediately since velocity is 0
        setIsCharging(true);
        if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
        holdTimerRef.current = setTimeout(() => {
            const currentActive = getActiveFace(s.rotX, s.rotY);
            setActiveIndex(currentActive);
            setIsPinned(true);
            setIsCharging(false);
        }, 4000);
    }, [isPinned]);

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
        const vx = -dy * 0.3;
        const vy = dx * 0.3;
        s.velX = vx;
        s.velY = vy;

        // Check if we should be charging based on speed (threshold ~0.3)
        const speed = Math.sqrt(vx * vx + vy * vy);
        const shouldBeCharging = speed < 0.3;

        setIsCharging((prev) => {
            if (shouldBeCharging && !prev) {
                // Restart timer if we just started charging again
                if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
                holdTimerRef.current = setTimeout(() => {
                    const currentActive = getActiveFace(stateRef.current.rotX, stateRef.current.rotY);
                    setActiveIndex(currentActive);
                    setIsPinned(true);
                    setIsCharging(false);
                }, 4000);
                return true;
            } else if (!shouldBeCharging && prev) {
                // Stop timer if we moved too fast
                if (holdTimerRef.current) {
                    clearTimeout(holdTimerRef.current);
                    holdTimerRef.current = null;
                }
                return false;
            }
            return prev;
        });
    }, []);

    const onPointerUp = useCallback(() => {
        stateRef.current.isDragging = false;
        setIsDragging(false);
        setIsCharging(false);
        if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
            holdTimerRef.current = null;
        }
    }, []);

    return (
        <div
            className={`select-none transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isPinned ? 'absolute top-1/2 left-0 -translate-y-1/2 scale-50' : 'relative'
                }`}
            style={{
                perspective: 800,
                perspectiveOrigin: '50% 50%',
                width: CUBE_SIZE,
                height: CUBE_SIZE,
                zIndex: isPinned ? 100 : 1,
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
                {FACE_CONFIGS.map((config, idx) => {
                    const project = projectsData[idx];
                    const Icon = project?.icon;
                    return (
                        <div
                            key={idx}
                            className="absolute inset-0 flex flex-col items-center justify-center border border-white/10 p-6 backface-visible overflow-hidden"
                            style={{
                                transform: config.transform,
                                background: config.bg,
                                backfaceVisibility: 'visible',
                            }}
                        >
                            {project && Icon && (
                                <>
                                    <div className="relative flex flex-col items-center justify-center">
                                        <Icon
                                            size={40}
                                            strokeWidth={1.5}
                                            className={`text-white mb-4 opacity-60 transition-all ${isCharging ? 'animate-spin opacity-100' : ''}`}
                                        />
                                        {isCharging && (
                                            <div className="absolute -bottom-2 w-16 h-1 bg-white/20 overflow-hidden">
                                                <div className="h-full bg-white animate-[loading_4s_linear_forwards]" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className={`font-heading font-bold text-[10px] text-center uppercase text-white/80 tracking-[0.2em] leading-tight px-2 transition-opacity ${isCharging ? 'opacity-0' : 'opacity-100'}`}>
                                        {project.title}
                                    </h3>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
            <style>{`
                @keyframes loading {
                    from { width: 0; }
                    to { width: 100%; }
                }
            `}</style>
        </div>
    );
}
