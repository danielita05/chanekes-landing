"use client"

import { ReactNode, useRef } from "react"
import { useGSAP, gsap, ANIMATION_CONFIG } from "@/lib/gsap"
import { usePrefersReducedMotion } from "@/src/hooks/usePrefersReducedMotion"
import { cn } from "@/lib/utils"

interface AnimatedBadgeProps {
  children: ReactNode
  variant?: "default" | "success" | "warning" | "info"
  glow?: boolean
  wiggle?: boolean
  shimmer?: boolean
  className?: string
  onClick?: () => void
}

const variants = {
  default: "bg-warm-white/10 text-warm-white border-warm-white/20",
  success: "bg-green-brand/20 text-green-brand border-green-brand/40",
  warning: "bg-magenta-neo/20 text-magenta-neo border-magenta-neo/40",
  info: "bg-blue-core/20 text-blue-core border-blue-core/40"
}

export default function AnimatedBadge({
  children,
  variant = "default",
  glow = false,
  wiggle = true,
  shimmer = true,
  className = "",
  onClick
}: AnimatedBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null)
  const shimmerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Animaciones con GSAP
  useGSAP(() => {
    if (prefersReducedMotion || !badgeRef.current) return

    const badge = badgeRef.current
    const config = ANIMATION_CONFIG.hover

    // Shimmer periódico
    if (shimmer && shimmerRef.current) {
      gsap.to(shimmerRef.current, {
        x: "200%",
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        repeatDelay: 6
      })
    }

    // Hover effects
    const handleMouseEnter = () => {
      if (wiggle) {
        gsap.to(badge, {
          rotation: 2,
          scale: config.scale.to,
          duration: config.duration,
          ease: config.tilt.ease
        })
      }
    }

    const handleMouseLeave = () => {
      if (wiggle) {
        gsap.to(badge, {
          rotation: 0,
          scale: config.scale.from,
          duration: config.duration,
          ease: config.tilt.ease
        })
      }
    }

    badge.addEventListener("mouseenter", handleMouseEnter)
    badge.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      badge.removeEventListener("mouseenter", handleMouseEnter)
      badge.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, { scope: badgeRef })

  const baseClasses = cn(
    "relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 overflow-hidden",
    variants[variant],
    glow && "shadow-lg",
    onClick && "cursor-pointer hover:shadow-xl",
    className
  )

  const glowClasses = glow ? {
    default: "hover:shadow-warm-white/20",
    success: "hover:shadow-green-brand/40",
    warning: "hover:shadow-magenta-neo/40", 
    info: "hover:shadow-blue-core/40"
  }[variant] : ""

  return (
    <div
      ref={badgeRef}
      className={cn(baseClasses, glowClasses)}
      onClick={onClick}
      style={{ willChange: "transform" }}
    >
      {/* Shimmer effect */}
      {shimmer && !prefersReducedMotion && (
        <div
          ref={shimmerRef}
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ willChange: "transform" }}
        />
      )}
      
      {/* Content */}
      <span className="relative z-10">
        {children}
      </span>
    </div>
  )
}