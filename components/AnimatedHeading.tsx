"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import type { JSX } from "react" // Import JSX to declare the variable

type Props = {
  text: string
  as?: keyof JSX.IntrinsicElements
  className?: string
  glow?: "green" | "magenta" | "blue"
}

const glowMap = {
  green: { color: "#76B826", shadow: "0 0 12px rgba(118,184,38,.6), 0 0 24px rgba(0,74,173,.35)" },
  magenta: { color: "#DD2BAD", shadow: "0 0 12px rgba(221,43,173,.6), 0 0 24px rgba(0,74,173,.35)" },
  blue: { color: "#004AAD", shadow: "0 0 12px rgba(0,74,173,.6), 0 0 24px rgba(198,255,0,.35)" },
}

export default function AnimatedHeading({ text, as = "h1", className = "", glow = "green" }: Props) {
  const Tag = as as any
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const letters = ref.current.querySelectorAll<HTMLElement>(".ah-letter")

    gsap.set(letters, { autoAlpha: 0, yPercent: reduce ? 0 : 80, rotate: reduce ? 0 : -6, transformOrigin: "50% 100%" })

    const { color, shadow } = glowMap[glow]
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
    tl.to(letters, {
      autoAlpha: 1,
      yPercent: 0,
      rotate: 0,
      duration: reduce ? 0.25 : 0.7,
      stagger: reduce ? 0.02 : 0.06,
    }).to(
      letters,
      {
        color,
        textShadow: shadow,
        duration: 0.5,
        stagger: 0.03,
      },
      "<+=0.05",
    )

    return () => {
      tl.kill()
    }
  }, [glow])

  return (
    <Tag ref={ref} className={className + " tracking-tight"} style={{ whiteSpace: 'pre' }}>
      {text.split("").map((ch, i) => (
        <span key={i} className="ah-letter inline-block will-change-transform">
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </Tag>
  )
}
