# ProjectCube — Interaction Bug Investigation

**File:** `src/components/sections/projects/ProjectCube.tsx`
**Date:** 2026-03-16

---

## Summary

Four distinct bugs cause broken drag/pin/mode interactions. They all stem from one architectural issue: `animate` is a `useCallback` that closes over `isPinned` React state, which forces it to be recreated every time `isPinned` changes. This triggers the `IntersectionObserver` effect to re-run, which starts a new rAF loop — but never cancels the old one. The remaining bugs are cleanup oversights on the state machine paths (unpin, mode switch, charging).

---

## Bug 1 — CRITICAL: Stale rAF loops accumulate on every `isPinned` change

**Where:** `animate` (line 154), `useEffect([animate])` (line 183)

**Root cause chain:**

```
isPinned changes
  → animate() recreated (depends on [isPinned])
  → useEffect([animate]) cleanup runs
      → observer.disconnect()           ✅ stops old observer
      → clearTimeout(holdTimerRef)       ✅ stops hold timer
      → cancelAnimationFrame(...)        ❌ MISSING — old loop keeps running
  → useEffect([animate]) re-runs
      → new IntersectionObserver fires
      → requestAnimationFrame(animate_new) starts NEW loop
  → Now TWO rAF loops run simultaneously
```

The cleanup never cancels `stateRef.current.animId`. Every `isPinned` toggle (pin, unpin, mode switch while pinned) adds one more rAF loop. After 2 pin/unpin cycles, 3 loops are running simultaneously.

**Observable symptoms:**
- After pinning and unpinning once, the cube spins at 2× speed
- After multiple interactions, rotation becomes erratic / jerky
- `velY` fights itself: `animate_v1` (capturing `isPinned=false`) keeps setting `velY = 0.15` while `animate_v2` (capturing `isPinned=true`) sets `velY = 0` — they race each other

**Fix:**
```tsx
// In useEffect([animate]) cleanup:
return () => {
    observer.disconnect();
    cancelAnimationFrame(stateRef.current.animId);  // ← add this line
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
};
```

**Root fix (eliminates the problem entirely):** Move `isPinned` into `stateRef` so `animate` has no React state dependencies and is never recreated:

```tsx
// stateRef gets an isPinned field:
const stateRef = useRef({
    ...,
    isPinned: false,
});

// Keep it in sync with a useEffect:
useEffect(() => {
    stateRef.current.isPinned = isPinned;
}, [isPinned]);

// animate reads from ref instead of closure:
const animate = useCallback(() => {
    const s = stateRef.current;
    // ...
    if (s.velX === 0 && s.velY === 0) {
        s.velY = s.isPinned ? 0 : 0.15;
    }
    const amplitude = s.isPinned ? FLOAT_AMPLITUDE / 2 : FLOAT_AMPLITUDE;
    // ...
}, []); // ← empty deps, never recreated
```

---

## Bug 2 — CRITICAL: Mode switch with active hold timer causes ghost pin

**Where:** `useEffect([isDesignMode])` (line 149), `holdTimerRef`

**Sequence:**
1. User starts holding the cube → `setIsCharging(true)`, `holdTimerRef.current = setTimeout(pin, 2000)`
2. User flips the mode Switch mid-hold (within the 2-second window)
3. `isDesignMode` effect fires → `setIsPinned(false)`, `setActiveIndex(0)`
4. `isCharging` stays `true` — spinner still visible with no interaction happening
5. 2 seconds after the original press, `holdTimerRef` fires → `setIsPinned(true)`, `setActiveIndex(face)` on the NEW mode's data
6. Cube auto-pins unexpectedly. The user did not intend to pin.

**Fix:**
```tsx
useEffect(() => {
    setIsPinned(false);
    setActiveIndex(0);
    setIsCharging(false);                              // ← add
    if (holdTimerRef.current) {                        // ← add
        clearTimeout(holdTimerRef.current);            // ← add
        holdTimerRef.current = null;                   // ← add
    }                                                  // ← add
    stateRef.current.isDragging = false;               // ← add (discard any active drag)
}, [isDesignMode]);
```

---

## Bug 3 — HIGH: `isCharging` not reset when user clicks to unpin

**Where:** `onPointerDown` early-return path (lines 202–207)

```tsx
const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (isPinned) {
        stateRef.current.isDragging = false;
        setIsDragging(false);
        setIsPinned(false);
        return;  // ← exits without cleaning up isCharging or holdTimer
    }
    // ...
}, [isPinned]);
```

**Scenario that triggers this:**
1. User grabs and barely moves the cube → `setIsCharging(true)` fires, `holdTimerRef` is set
2. User releases before 2 seconds → `onPointerUp` fires: `setIsCharging(false)`, clears timer — OK so far
3. User immediately taps cube again while React hasn't re-rendered yet (stale `isPinned=false`)
4. Unlikely but possible: if `isPinned` was `true` (from a previous session), the early-return path skips both `setIsCharging(false)` and `clearTimeout(holdTimerRef.current)`

More concretely: the pattern is architecturally incomplete — the unpin path doesn't mirror the cleanup that `onPointerUp` does.

**Fix:**
```tsx
if (isPinned) {
    stateRef.current.isDragging = false;
    setIsDragging(false);
    setIsPinned(false);
    setIsCharging(false);                              // ← add
    if (holdTimerRef.current) {                        // ← add
        clearTimeout(holdTimerRef.current);            // ← add
        holdTimerRef.current = null;                   // ← add
    }                                                  // ← add
    return;
}
```

---

## Bug 4 — HIGH: Side effect inside `setState` updater in `onPointerMove`

**Where:** `onPointerMove`, lines 252–270

```tsx
setIsCharging((prev) => {
    if (shouldBeCharging && !prev) {
        // ❌ Side effect inside setState updater:
        holdTimerRef.current = setTimeout(() => {
            setActiveIndex(...);
            setIsPinned(true);
            setIsCharging(false);
        }, 2000);
        return true;
    }
    // ...
});
```

React may invoke setState updaters more than once in concurrent/strict mode. In development with `React.StrictMode`, this runs twice → two timers are created → the cube pins after ~1 second (first timer fires, second fires immediately after). This makes the "hold to pin" mechanic feel broken in development and unreliable on fast devices.

Additionally, `setTimeout` inside a `setState` callback is conceptually wrong: it's a side effect, not a state derivation.

**Fix:** Separate the timer logic from the state update:
```tsx
const onPointerMove = useCallback((e: React.PointerEvent) => {
    // ...compute dx, dy, speed...

    const shouldBeCharging = speed < 0.3;

    if (shouldBeCharging) {
        if (!isChargingRef.current) {
            isChargingRef.current = true;
            setIsCharging(true);
            if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
            holdTimerRef.current = setTimeout(() => {
                setActiveIndex(getActiveFace(stateRef.current.rotX, stateRef.current.rotY));
                setIsPinned(true);
                setIsCharging(false);
                isChargingRef.current = false;
            }, 2000);
        }
    } else {
        if (isChargingRef.current) {
            isChargingRef.current = false;
            setIsCharging(false);
            if (holdTimerRef.current) {
                clearTimeout(holdTimerRef.current);
                holdTimerRef.current = null;
            }
        }
    }
}, []);
```

Where `isChargingRef = useRef(false)` tracks the current charging state without causing re-renders and without using a setState updater as a side-effect vehicle.

---

## Interaction Flow Diagram (current broken state)

```
User grabs cube
  → onPointerDown: s.isDragging=true, setIsCharging(true), holdTimer starts
  → onPointerMove: if slow → setIsCharging(prev=>{setTimeout(...)}) ← Bug 4
  → holdTimer fires (2s): setIsPinned(true)
    → isPinned state changes
    → animate recreated                            ← Bug 1 starts
    → old rAF loop NOT cancelled
    → new rAF loop starts
    → 2 loops running simultaneously

User switches mode while cube is animating
  → isDesignMode effect: setIsPinned(false) only
  → holdTimer NOT cancelled                        ← Bug 2 if mid-hold
  → isCharging NOT reset                           ← Bug 2 visible artifact

User clicks to unpin
  → onPointerDown early return: setIsPinned(false)
  → isCharging NOT reset                           ← Bug 3 visible artifact
  → isPinned false → animate recreated again
  → 3rd rAF loop starts                           ← Bug 1 accumulates
```

---

## Fix Priority

| # | Bug | Trigger | Severity |
|---|-----|---------|----------|
| 1 | rAF loops accumulate — add `cancelAnimationFrame` to cleanup | Every pin/unpin | Critical |
| 1b | Move `isPinned` into `stateRef` to eliminate `animate` recreation | Same | Best fix |
| 2 | Mode switch while charging — cancel timer + reset charging in effect | Toggle switch mid-hold | Critical |
| 3 | Unpin path missing charging cleanup | Click pinned cube | High |
| 4 | Side effect inside setState updater | Every pointer move | High |

All four fixes are localized to `ProjectCube.tsx`. No external interface changes needed.
