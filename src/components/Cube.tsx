import { useRef, useEffect, useCallback, useState } from 'react';
import { projectsData, designProjectsData } from '../data/mockData';

const DAMPING = 0.97;
const MIN_VELOCITY = 0.05;
const FLOAT_AMPLITUDE = 8;
const FLOAT_SPEED = 0.002;
const CUBE_SIZE = 270;

// Rubik face colors with contrasting text
const RUBIK_FACES = [
    { bg: 'rgba(255, 0, 0, 1)', text: '#fff' },    // Red → white
    { bg: 'rgba(0, 140, 255, 1)', text: '#fff' },    // Blue → white
    { bg: 'rgba(6, 174, 12, 1)', text: '#fff' },    // Green → white
    { bg: 'rgba(255, 217, 0, 1)', text: '#1a1a1a' }, // Yellow → dark
    { bg: 'rgba(255, 255, 255, 1)', text: '#1a1a1a' }, // White → dark
    { bg: 'rgba(255, 149, 0, 1)', text: '#fff' },    // Orange → white
];

const getActiveFace = (rotX: number, rotY: number) => {
    const radX = (rotX * Math.PI) / 180;
    const radY = (rotY * Math.PI) / 180;

    const faces = [
        { id: 0, z: Math.cos(radX) * Math.cos(radY) },
        { id: 1, z: -Math.cos(radX) * Math.cos(radY) },
        { id: 2, z: -Math.cos(radX) * Math.sin(radY) },
        { id: 3, z: Math.cos(radX) * Math.sin(radY) },
        { id: 4, z: -Math.sin(radX) },
        { id: 5, z: Math.sin(radX) },
    ];

    return faces.reduce((prev, curr) => (curr.z > prev.z ? curr : prev)).id;
};

const FACE_CONFIGS = [
    { transform: `translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgb(0,0,0)' },
    { transform: `rotateY(180deg) translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgb(0,0,0)' },
    { transform: `rotateY(90deg) translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgb(0,0,0)' },
    { transform: `rotateY(-90deg) translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgb(0,0,0)' },
    { transform: `rotateX(90deg) translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgb(0,0,0)' },
    { transform: `rotateX(-90deg) translateZ(${CUBE_SIZE / 2}px)`, bg: 'rgb(0,0,0)' },
];

interface CubeProps {
    onPinChange?: (pinned: boolean, activeIndex: number) => void;
    isDesignMode?: boolean;
}

export default function Cube({ onPinChange, isDesignMode = false }: CubeProps) {
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

    const currentData = isDesignMode ? designProjectsData : projectsData;

    useEffect(() => {
        onPinChange?.(isPinned, activeIndex);
    }, [isPinned, activeIndex, onPinChange]);

    // Unpin when mode changes
    useEffect(() => {
        setIsPinned(false);
        setActiveIndex(0);
    }, [isDesignMode]);

    const animate = useCallback(() => {
        const s = stateRef.current;
        const now = performance.now();

        if (!s.isDragging) {
            s.rotX += s.velX;
            s.rotY += s.velY;
            s.velX *= DAMPING;
            s.velY *= DAMPING;

            if (Math.abs(s.velX) < MIN_VELOCITY) s.velX = 0;
            if (Math.abs(s.velY) < MIN_VELOCITY) s.velY = 0;

            if (s.velX === 0 && s.velY === 0) {
                s.velY = isPinned ? 0 : 0.15;
            }
        }

        const amplitude = isPinned ? FLOAT_AMPLITUDE / 2 : FLOAT_AMPLITUDE;
        s.floatOffset = Math.sin(now * FLOAT_SPEED) * amplitude;

        if (cubeRef.current) {
            cubeRef.current.style.transform =
                `translateY(${s.floatOffset}px) rotateX(${s.rotX}deg) rotateY(${s.rotY}deg)`;
        }

        s.animId = requestAnimationFrame(animate);
    }, [isPinned]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    stateRef.current.animId = requestAnimationFrame(animate);
                } else {
                    cancelAnimationFrame(stateRef.current.animId);
                }
            },
            { threshold: 0 }
        );
        if (cubeRef.current) observer.observe(cubeRef.current);
        return () => {
            observer.disconnect();
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

        const vx = -dy * 0.3;
        const vy = dx * 0.3;
        s.velX = vx;
        s.velY = vy;

        const speed = Math.sqrt(vx * vx + vy * vy);
        const shouldBeCharging = speed < 0.3;

        setIsCharging((prev) => {
            if (shouldBeCharging && !prev) {
                if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
                holdTimerRef.current = setTimeout(() => {
                    const currentActive = getActiveFace(stateRef.current.rotX, stateRef.current.rotY);
                    setActiveIndex(currentActive);
                    setIsPinned(true);
                    setIsCharging(false);
                }, 4000);
                return true;
            } else if (!shouldBeCharging && prev) {
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

    const renderFaceContent = (idx: number) => {
        const project = currentData[idx];
        const Icon = project?.icon;

        if (isDesignMode) {
            // Rubik 3x3 grid mode
            const face = RUBIK_FACES[idx] || RUBIK_FACES[0];
            return (
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[3px] p-[3px]">
                    {Array.from({ length: 9 }).map((_, cellIdx) => (
                        <div
                            key={cellIdx}
                            className="rounded-[2px] transition-all duration-500"
                            style={{ background: face.bg }}
                        />
                    ))}
                    {/* Overlay project info on center cell */}
                    {project && Icon && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <Icon
                                size={32}
                                strokeWidth={1.5}
                                className={`mb-2 text-black drop-shadow-md transition-all ${isCharging ? 'animate-spin' : ''}`}
                            />
                            {isCharging && (
                                <div className="w-12 h-1 overflow-hidden bg-black/20">
                                    <div className="h-full bg-black animate-[loading_4s_linear_forwards]" />
                                </div>
                            )}
                            <h3
                                className={`font-heading font-bold text-[9px] text-center uppercase tracking-[0.15em] leading-tight inline bg-black text-white px-2 py-1 transition-opacity ${isCharging ? 'opacity-0' : ''}`}
                            >
                                {project.title}
                            </h3>
                        </div>
                    )}
                </div>
            );
        }

        // Engineering mode - original wireframe style
        return (
            <>
                {project && Icon && (
                    <>
                        <div className="relative flex flex-col items-center justify-center">
                            <Icon
                                size={40}
                                strokeWidth={1.5}
                                className={`text-white mb-4 transition-all ${isCharging ? 'animate-spin' : ''}`}
                            />
                            {isCharging && (
                                <div className="absolute -bottom-2 w-16 h-1 bg-white/20 overflow-hidden">
                                    <div className="h-full bg-white animate-[loading_4s_linear_forwards]" />
                                </div>
                            )}
                        </div>
                        <h3 className={`font-heading font-bold text-[10px] text-center uppercase text-white tracking-[0.2em] leading-tight px-2 transition-opacity ${isCharging ? 'opacity-0' : ''}`}>
                            {project.title}
                        </h3>
                    </>
                )}
            </>
        );
    };

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
                {FACE_CONFIGS.map((config, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 flex flex-col items-center justify-center p-6 backface-visible overflow-hidden transition-all duration-700 ${isDesignMode ? 'border-2 border-black/30' : 'border border-white/10'
                            }`}
                        style={{
                            transform: config.transform,
                            background: isDesignMode ? 'rgb(20,20,20)' : config.bg,
                            backfaceVisibility: 'visible',
                        }}
                    >
                        {renderFaceContent(idx)}
                    </div>
                ))}
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
