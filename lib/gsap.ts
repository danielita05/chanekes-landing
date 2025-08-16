"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { useGSAP } from "@gsap/react"
import { useEffect, useRef, RefObject } from "react"
import { usePrefersReducedMotion } from "@/src/hooks/usePrefersReducedMotion"

// Register GSAP plugins conditionally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
}

// Export configuraciones de animación
export const ANIMATION_CONFIG = {
  // Hero section timing
  hero: {
    stagger: 0.12,
    duration: 0.8,
    ease: "power2.out",
    logoScale: { from: 0.8, to: 1, duration: 1.2 },
    textReveal: { y: 50, opacity: 0, duration: 0.6 }
  },
  // Scroll reveals
  scroll: {
    duration: 0.6,
    ease: "power2.out",
    yOffset: 24,
    stagger: 0.08,
    trigger: { start: "top 80%", end: "bottom 20%" }
  },
  // Micro-interactions
  hover: {
    duration: 0.2,
    tilt: { max: 4, ease: "power2.out" },
    scale: { from: 1, to: 1.02 },
    glow: { intensity: 0.6 }
  },
  // Particles
  particles: {
    count: { low: 15, med: 25, high: 40 },
    speed: { min: 0.5, max: 1.5 },
    size: { min: 2, max: 6 }
  }
}

// Helper mejorado con @gsap/react
export const withGsapContext = (
  ref: RefObject<HTMLElement>,
  animation: (ctx: gsap.Context) => void
) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(() => {
    if (prefersReducedMotion || !ref.current) return
    animation(gsap.context(() => {}, ref))
  }, { scope: ref })
}

// Utilidad para scroll reveals
export const initScrollReveal = (
  container: RefObject<HTMLElement>,
  selector: string,
  options: Partial<typeof ANIMATION_CONFIG.scroll> = {}
) => {
  const config = { ...ANIMATION_CONFIG.scroll, ...options }
  const prefersReducedMotion = usePrefersReducedMotion()
  
  useGSAP(() => {
    if (prefersReducedMotion || !container.current) return

    const elements = container.current.querySelectorAll(selector)
    
    gsap.set(elements, {
      y: config.yOffset,
      opacity: 0
    })

    gsap.to(elements, {
      y: 0,
      opacity: 1,
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,
      scrollTrigger: {
        trigger: container.current,
        start: config.trigger.start,
        end: config.trigger.end,
        toggleActions: "play none none reverse"
      }
    })
  }, { scope: container })
}

// Parallax utilities
export const createParallax = (
  element: RefObject<HTMLElement>, 
  speed: number = 0.5
) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  
  useGSAP(() => {
    if (prefersReducedMotion || !element.current) return

    gsap.to(element.current, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })
  }, { scope: element })
}

// Exportar re-exports útiles
export { useGSAP } from "@gsap/react"
export { gsap }
