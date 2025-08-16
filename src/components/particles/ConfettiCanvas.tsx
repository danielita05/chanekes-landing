"use client"

import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "@/src/hooks/usePrefersReducedMotion"
import { ANIMATION_CONFIG } from "@/lib/gsap"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rotation: number
  rotationSpeed: number
}

interface ConfettiCanvasProps {
  density?: "low" | "med" | "high"
  paused?: boolean
  colorPalette?: string[]
  className?: string
}

const defaultColors = [
  "#76b826", // Green brand
  "#dd2bad", // Magenta neo
  "#004aad", // Blue core
  "#00cfff", // Blue electric
  "#fafafa"  // Warm white
]

export default function ConfettiCanvas({ 
  density = "low", 
  paused = false,
  colorPalette = defaultColors,
  className = ""
}: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const prefersReducedMotion = usePrefersReducedMotion()

  // No renderizar si prefiere animaciones reducidas
  if (prefersReducedMotion) {
    return null
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar canvas responsive
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"
    }

    // Inicializar partículas
    const initParticles = () => {
      const config = ANIMATION_CONFIG.particles
      const count = config.count[density]
      particlesRef.current = []

      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * config.speed.max,
          vy: (Math.random() - 0.5) * config.speed.max,
          size: Math.random() * (config.size.max - config.size.min) + config.size.min,
          color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02
        })
      }
    }

    // Animar partículas
    const animate = () => {
      if (paused) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      
      particlesRef.current.forEach(particle => {
        // Actualizar posición
        particle.x += particle.vx
        particle.y += particle.vy
        particle.rotation += particle.rotationSpeed

        // Rebotar en bordes
        if (particle.x < 0 || particle.x > canvas.offsetWidth) {
          particle.vx *= -0.8
        }
        if (particle.y < 0 || particle.y > canvas.offsetHeight) {
          particle.vy *= -0.8
        }

        // Mantener dentro del canvas
        particle.x = Math.max(0, Math.min(canvas.offsetWidth, particle.x))
        particle.y = Math.max(0, Math.min(canvas.offsetHeight, particle.y))

        // Dibujar partícula
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)
        ctx.fillStyle = particle.color
        ctx.shadowColor = particle.color
        ctx.shadowBlur = 4
        
        // Diferentes formas para variedad
        const shape = Math.floor(Math.random() * 3)
        switch (shape) {
          case 0: // Círculo
            ctx.beginPath()
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
            ctx.fill()
            break
          case 1: // Estrella
            drawStar(ctx, 0, 0, particle.size, particle.size * 0.5, 5)
            break
          case 2: // Triángulo
            drawTriangle(ctx, particle.size)
            break
        }
        
        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Funciones auxiliares para dibujar formas
    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, outerRadius: number, innerRadius: number, points: number) => {
      ctx.beginPath()
      const step = Math.PI / points
      for (let i = 0; i <= 2 * Math.PI; i += step) {
        const radius = i % (2 * step) === 0 ? outerRadius : innerRadius
        const pointX = x + Math.cos(i) * radius
        const pointY = y + Math.sin(i) * radius
        if (i === 0) ctx.moveTo(pointX, pointY)
        else ctx.lineTo(pointX, pointY)
      }
      ctx.closePath()
      ctx.fill()
    }

    const drawTriangle = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.lineTo(-size * 0.866, size * 0.5)
      ctx.lineTo(size * 0.866, size * 0.5)
      ctx.closePath()
      ctx.fill()
    }

    // Configurar
    resizeCanvas()
    initParticles()
    animate()

    // Event listeners
    window.addEventListener("resize", resizeCanvas)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [density, paused, colorPalette])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1
      }}
    />
  )
}