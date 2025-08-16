"use client"
import { useEffect } from "react"
import { gsap } from "gsap"

export function useNeonPulse(selector: string) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 1.8, ease: "sine.inOut" } })
    tl.to(selector, {
      color: "#76B826",
      textShadow: "0 0 10px rgba(118,184,38,.6), 0 0 24px rgba(221,43,173,.35)",
    }).to(selector, {
      color: "#DD2BAD",
      textShadow: "0 0 10px rgba(221,43,173,.6), 0 0 24px rgba(118,184,38,.35)",
    })

    return () => tl.kill()
  }, [selector])
}
