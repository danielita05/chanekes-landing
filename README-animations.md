# 🎭 Sistema de Animaciones Chanekes

Sistema completo de animaciones para la landing page de Chanekes usando GSAP + React + Tailwind CSS.

## 🚀 Instalación y Setup

```bash
npm install @gsap/react gsap
```

Las animaciones están configuradas para respetar `prefers-reduced-motion` automáticamente.

## 🎯 Componentes Principales

### 1. **ConfettiCanvas**
Partículas ligeras en el background del Hero.

```tsx
import ConfettiCanvas from "@/src/components/particles/ConfettiCanvas"

<ConfettiCanvas 
  density="low"        // "low" | "med" | "high"
  paused={false}       // Pausar animación
  colorPalette={[      // Colores personalizados
    "#76b826", "#dd2bad", "#004aad"
  ]}
/>
```

### 2. **AnimatedBadge**
Badge con efectos shimmer y micro-interacciones.

```tsx
import AnimatedBadge from "@/src/components/ui/AnimatedBadge"

<AnimatedBadge
  variant="success"    // "default" | "success" | "warning" | "info"
  glow={true}         // Efecto glow
  wiggle={true}       // Micro-wiggle on hover
  shimmer={true}      // Efecto shimmer periódico
>
  ✨ Entretenimiento Premium
</AnimatedBadge>
```

### 3. **AnimatedHeading**
Títulos con animación letra por letra.

```tsx
import AnimatedHeading from "@/components/AnimatedHeading"

<AnimatedHeading
  text="CHANEKES"
  as="h1"
  glow="green"        // "green" | "magenta" | "blue"
  className="text-5xl font-bold"
/>
```

## 🛠️ Hooks y Utilidades

### Hook para Reduced Motion
```tsx
import { usePrefersReducedMotion } from "@/src/hooks/usePrefersReducedMotion"

const prefersReducedMotion = usePrefersReducedMotion()
// Automáticamente respeta la preferencia del usuario
```

### Scroll Reveals
```tsx
import { initScrollReveal } from "@/lib/gsap"

const sectionRef = useRef<HTMLElement>(null)

// Aplicar scroll reveal a elementos con clase .reveal-item
initScrollReveal(sectionRef, '.reveal-item', {
  yOffset: 30,        // Distancia inicial
  stagger: 0.1,       // Delay entre elementos
  duration: 0.8       // Duración de la animación
})
```

### Parallax Simple
```tsx
import { createParallax } from "@/lib/gsap"

const backgroundRef = useRef<HTMLDivElement>(null)

// Aplicar parallax con velocidad 0.3
createParallax(backgroundRef, 0.3)
```

### GSAP Context Avanzado
```tsx
import { useGSAP, gsap, ANIMATION_CONFIG } from "@/lib/gsap"

useGSAP(() => {
  // Tus animaciones aquí
  gsap.to(".elemento", {
    x: 100,
    duration: ANIMATION_CONFIG.hero.duration,
    ease: ANIMATION_CONFIG.hero.ease
  })
}, { scope: containerRef })
```

## 🎨 Clases CSS Disponibles

### Efectos Glow
```css
.glow-green     /* Glow verde */
.glow-magenta   /* Glow magenta */
.glow-blue      /* Glow azul */
```

### Animaciones de Flotación
```css
.float          /* Flotación básica */
.float-delayed  /* Flotación con delay */
```

### Efectos Shimmer
```css
.shimmer        /* Shimmer blanco */
.shimmer-green  /* Shimmer verde */
```

### Micro-interacciones
```css
.hover-lift     /* Elevación on hover */
.hover-tilt     /* Inclinación 3D on hover */
.pulse-glow     /* Pulso con glow */
```

### Reveal Animations
```css
.animate-slide-up    /* Deslizar desde abajo */
.animate-slide-left  /* Deslizar desde izquierda */
.animate-slide-right /* Deslizar desde derecha */
.animate-scale-in    /* Escalar desde centro */
```

### Stagger Utilities
```css
.stagger-item:nth-child(1) /* Delay 0.1s */
.stagger-item:nth-child(2) /* Delay 0.2s */
/* ... hasta 6 elementos */
```

## ⚙️ Configuración de Animaciones

Todas las configuraciones están centralizadas en `ANIMATION_CONFIG`:

```tsx
export const ANIMATION_CONFIG = {
  hero: {
    stagger: 0.12,
    duration: 0.8,
    ease: "power2.out",
    logoScale: { from: 0.8, to: 1, duration: 1.2 },
    textReveal: { y: 50, opacity: 0, duration: 0.6 }
  },
  scroll: {
    duration: 0.6,
    ease: "power2.out",
    yOffset: 24,
    stagger: 0.08,
    trigger: { start: "top 80%", end: "bottom 20%" }
  },
  hover: {
    duration: 0.2,
    tilt: { max: 4, ease: "power2.out" },
    scale: { from: 1, to: 1.02 },
    glow: { intensity: 0.6 }
  },
  particles: {
    count: { low: 15, med: 25, high: 40 },
    speed: { min: 0.5, max: 1.5 },
    size: { min: 2, max: 6 }
  }
}
```

## 🎭 Ejemplos de Uso

### Hero Section Completo
```tsx
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  
  // Parallax para fondo
  createParallax(backgroundRef, 0.3)
  
  // Animaciones principales
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    
    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out"
    })
  }, { scope: heroRef })

  return (
    <section ref={heroRef}>
      {/* Partículas de fondo */}
      <ConfettiCanvas density="low" className="opacity-60" />
      
      {/* Contenido con parallax */}
      <div ref={backgroundRef}>
        {/* Logo y contenido */}
      </div>
    </section>
  )
}
```

### Section con Scroll Reveal
```tsx
export default function MySection() {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Auto-aplicar scroll reveal
  initScrollReveal(sectionRef, '.reveal-item')
  
  return (
    <section ref={sectionRef}>
      <h2 className="reveal-item">Título</h2>
      <p className="reveal-item">Descripción</p>
      <div className="reveal-item">
        <MyComponent />
      </div>
    </section>
  )
}
```

## 🔧 Troubleshooting

### Las animaciones no se ejecutan
1. Verificar que `prefersReducedMotion` no esté activo
2. Comprobar que los refs estén correctamente asignados
3. Asegurar que el componente esté montado

### Performance Issues
1. Usar `will-change: transform` en elementos animados
2. Evitar animar `top/left`, usar `transform` en su lugar
3. Limitar número de partículas en dispositivos móviles

### Accessibility
Las animaciones se desactivan automáticamente cuando `prefers-reduced-motion: reduce` está activo.

## 🎯 Testing

### Desktop
- Hover effects en cards y badges
- Parallax mousemove en Hero
- Scroll reveals fluidos

### Mobile
- Touch interactions
- Reduced particle count
- Simplified animations

### Accessibility
- Activar "Reduce motion" en OS
- Verificar que las animaciones se desactivan
- Navigation funcional sin animaciones

## 📊 Performance

- **LCP**: Priorizado en heading, no en video/partículas
- **CLS**: 0 mediante reserva de espacio
- **Bundle size**: GSAP cargado on-demand
- **Memory**: Cleanup automático de contextos GSAP

---

**Colores Chanekes:**
- 🟢 Verde: `#76b826`
- 🩷 Magenta: `#dd2bad`  
- 🔵 Azul: `#004aad`
- ⚡ Eléctrico: `#00cfff`