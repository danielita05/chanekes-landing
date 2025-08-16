"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

// Register GSAP plugins conditionally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Helper for safe GSAP context
export const useGSAPContext = () => {
  const contextRef = useRef<gsap.Context>()

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!prefersReducedMotion) {
      contextRef.current = gsap.context(() => {})
    }

    return () => {
      if (contextRef.current) {
        contextRef.current.revert()
      }
    }
  }, [])

  return contextRef.current
}

// Animation configurations - easy to modify
export const ANIMATION_CONFIG = {
  // Logo animation timing
  logo: {
    duration: 1.2,
    stagger: 0.08,
    ease: "power2.out",
  },
  // Hero section timing
  hero: {
    stagger: 0.12,
    duration: 0.8,
    ease: "power2.out",
  },
  // Scroll animations
  scroll: {
    duration: 0.6,
    ease: "power2.out",
    yOffset: 30,
  },
}
