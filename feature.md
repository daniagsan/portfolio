# Plan de Optimización de Performance

> Memoria actual: **577 MB** | Bundle actual: **~524 KB JS+CSS**

---

## Prioridad 1 — CRÍTICO (mayor impacto inmediato)

### 1.1 Limpiar paquetes extraneous (≈ 379 MB ahorrados)
`node_modules` contiene **66 paquetes huérfanos** de un template anterior (three.js, @react-three/fiber, cannon, rapier, @mediapipe, react-spring, WebGPU types…).

```bash
npm prune
```

Verificar y eliminar del `package.json` cualquier dependencia que no se use.

---

### 1.2 Eliminar `@emotion/react` (no se usa en ningún archivo)
Solo `styled-components` está activo (en `Switch.tsx`). Tener ambas librerías CSS-in-JS es redundante.

```bash
npm uninstall @emotion/react
```

---

### 1.4 Optimizar imagen de perfil (101 KB → ~25–35 KB)
El JPEG del perfil es el asset más pesado y se carga en critical path.

- Comprimir con herramienta como Squoosh / sharp
- Convertir a **WebP**
- Añadir `width` y `height` para evitar layout shift
- Renombrar el archivo (quitar el UUID en el nombre)

```tsx
// HeroSection.tsx — añadir atributos
<img src={profilePic} alt="Profile" width={224} height={224} loading="eager" />
```

---

## Prioridad 2 — ALTO

### 2.1 Pausar el RAF de `Cube.tsx` cuando está fuera de pantalla
El loop de `requestAnimationFrame` corre a **60fps constantemente**, incluso cuando el usuario está en otra sección. Implementar `IntersectionObserver` para pausarlo.

```tsx
// En Cube.tsx
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
  return () => observer.disconnect();
}, [animate]);
```

---

### 2.2 Eliminar imports SVG sin usar en `mockData.ts`
Dos SVGs importados pero nunca renderizados:

- `jsicon.svg` — duplicado de `js-svgrepo-com.svg`
- `expo-svgrepo-com.svg` — importado pero no incluido en ningún array de datos

Eliminar ambas líneas de import.

---

### 2.3 Consolidar los dos RAF loops de `TechStackSection.tsx`
Hay **2 instancias de `FloatingBot`** con sus propios RAF loops y partículas corriendo simultáneamente. Unificarlos en un único loop compartido o usar `requestIdleCallback` para las partículas.

---

### 2.4 Memoizar componentes hijos costosos
Los componentes que reciben props y re-renderizan sin cambios deben envolverse en `React.memo`:

- `TechCard` en `TechStackSection.tsx`
- `renderFaceContent` en `Cube.tsx` → convertir a `useMemo`

---

## Prioridad 3 — MEDIO

### 3.1 Simplificar el patrón de lazy-loading en `App.tsx`
El patrón `.then(m => ({ default: m.ComponentName }))` es repetitivo. Usar exports default en los componentes simplifica el split:

```tsx
// Antes
const ProcessSection = lazy(() => import('./components/ProcessSection').then(m => ({ default: m.ProcessSection })));

// Después (requiere añadir export default en el componente)
const ProcessSection = lazy(() => import('./components/ProcessSection'));
```

---

### 3.2 Añadir opciones de build en `vite.config.ts`

```ts
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
        },
      },
    },
  },
});
```

---

### 3.3 Optimizar SVGs grandes con SVGO
Los SVGs de `postgresql` (7.7 KB) y `node` (7.1 KB) son ~2–3× más grandes que los demás. Pasarlos por SVGO puede reducirlos un 20–30%.

```bash
npx svgo src/assets/tech/postgresql-svgrepo-com.svg
npx svgo src/assets/tech/node-svgrepo-com.svg
```

---

## Resumen de ahorro estimado

| Acción | Ahorro |
|---|---|
| `npm prune` (extraneous packages) | ~379 MB (node_modules) |
| Eliminar `@emotion/react` | ~25–40 KB (bundle) |
| Eliminar `styled-components` | ~35–60 KB (bundle) |
| Comprimir imagen de perfil | ~65–75 KB (assets) |
| Eliminar SVGs sin usar | ~3 KB (bundle) |
| Optimizar SVGs grandes | ~3–5 KB (assets) |
| RAF con IntersectionObserver | CPU en reposo |
| Manual chunks en Vite | Mejor cache hit rate |

**Objetivo realista post-optimización:** node_modules ~150–180 MB · Bundle JS+CSS ~380–420 KB
