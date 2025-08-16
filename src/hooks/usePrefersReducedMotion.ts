"use client"

import { useEffect, useState } from "react"

/**
 * Hook que detecta si el usuario prefiere animaciones reducidas
 * Server-safe y respeta prefers-reduced-motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    
    // Establecer valor inicial
    setPrefersReducedMotion(mediaQuery.matches)

    // Escuchar cambios
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener("change", handleChange)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return prefersReducedMotion
}