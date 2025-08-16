"use client"

import { useRef } from "react"
import { useGSAP, gsap, ANIMATION_CONFIG, createParallax } from "@/lib/gsap"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import AnimatedHeading from "@/components/AnimatedHeading"
import AnimatedBadge from "@/src/components/ui/AnimatedBadge"
import ConfettiCanvas from "@/src/components/particles/ConfettiCanvas"
import { usePrefersReducedMotion } from "@/src/hooks/usePrefersReducedMotion"

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Parallax para el fondo
  createParallax(backgroundRef, 0.3)

  // Animaciones principales del hero
  useGSAP(() => {
    if (prefersReducedMotion || !heroRef.current) return

    const config = ANIMATION_CONFIG.hero
    const tl = gsap.timeline({ delay: 0.5 })

    // Logo entrance con scale y parallax
    if (logoRef.current) {
      gsap.set(logoRef.current, { 
        scale: config.logoScale.from, 
        opacity: 0 
      })
      
      tl.to(logoRef.current, {
        scale: config.logoScale.to,
        opacity: 1,
        duration: config.logoScale.duration,
        ease: config.ease
      })
    }

    // Badge entrance
    if (badgeRef.current) {
      gsap.set(badgeRef.current, { y: -20, opacity: 0 })
      tl.to(badgeRef.current, {
        y: 0,
        opacity: 1,
        duration: config.duration,
        ease: config.ease
      }, "-=0.8")
    }

    // Título con stagger
    if (titleRef.current) {
      gsap.set(titleRef.current, config.textReveal)
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: config.textReveal.duration,
        ease: config.ease
      }, "-=0.6")
    }

    // Subtítulo
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { y: 30, opacity: 0 })
      tl.to(subtitleRef.current, {
        y: 0,
        opacity: 1,
        duration: config.duration,
        ease: config.ease
      }, "-=0.4")
    }

    // CTAs con stagger
    if (ctaRef.current) {
      const buttons = ctaRef.current.children
      gsap.set(buttons, { y: 20, opacity: 0 })
      tl.to(buttons, {
        y: 0,
        opacity: 1,
        duration: config.duration,
        stagger: config.stagger,
        ease: config.ease
      }, "-=0.3")
    }

    // Círculos flotantes
    const circles = heroRef.current.querySelectorAll(".bouncing-circle")
    circles.forEach((circle, index) => {
      gsap.to(circle, {
        y: -30,
        duration: 2 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.5,
      })
    })

    // Mousemove parallax para desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return
      
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const xPercent = (clientX / innerWidth - 0.5) * 20
      const yPercent = (clientY / innerHeight - 0.5) * 20

      gsap.to(logoRef.current, {
        x: xPercent,
        y: yPercent,
        duration: 1,
        ease: "power2.out"
      })

      circles.forEach((circle, index) => {
        const multiplier = (index + 1) * 0.3
        gsap.to(circle, {
          x: xPercent * multiplier,
          y: yPercent * multiplier,
          duration: 1 + index * 0.1,
          ease: "power2.out"
        })
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, { scope: heroRef })

  const whatsappLink =
    "https://wa.me/527449097483?text=%C2%A1Hola!%20Estoy%20interesado%20vivir%20la%20experiencia%20Chanekes.%20La%20fecha%20de%20mi%20evento%20es%20el:%20"

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink">
      {/* Background con parallax */}
      <div ref={backgroundRef} className="absolute inset-0 opacity-30" style={{ willChange: "transform" }}>
        <div className="absolute top-20 left-20 w-16 h-16 opacity-60 pointer-events-none">
          <Image src="/bouncing-circles.svg" alt="" width={64} height={64} className="bouncing-circle" />
        </div>
        <div className="absolute top-40 right-32 w-12 h-12 opacity-40 pointer-events-none">
          <Image src="/bouncing-circles.svg" alt="" width={48} height={48} className="bouncing-circle" />
        </div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 opacity-50 pointer-events-none">
          <Image src="/bouncing-circles.svg" alt="" width={80} height={80} className="bouncing-circle" />
        </div>
        <div className="absolute top-1/2 right-20 w-8 h-8 opacity-30 pointer-events-none">
          <Image src="/bouncing-circles.svg" alt="" width={32} height={32} className="bouncing-circle" />
        </div>
      </div>

      {/* Partículas de confetti */}
      <ConfettiCanvas 
        density="low" 
        className="opacity-60" 
      />

      <div className="container max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Logo Column */}
          <div ref={logoRef} className="flex justify-center lg:justify-end" style={{ willChange: "transform" }}>
            <Image
              src="/logo-chanekes.png"
              alt="Chanekes Logo"
              width={300}
              height={300}
              priority
              className="w-64 h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
            />
          </div>

          {/* Content Column */}
          <div className="text-center lg:text-left">
            {/* Badge superior */}
            <div ref={badgeRef} className="mb-6 flex justify-center lg:justify-start">
              <AnimatedBadge
                variant="success"
                glow
                shimmer
                className="text-sm font-semibold"
              >
                ✨ Entretenimiento Premium
              </AnimatedBadge>
            </div>
            
            <div className="hero-title mb-8">
              <AnimatedHeading
                text="CHANEKES"
                as="h1"
                glow="green"
                className="text-5xl md:text-7xl font-extrabold text-warm-white"
              />
            </div>

            {/* Main title */}
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-warm-white"
            >
              La emoción de tu <span className="text-magenta-neo">fiesta</span> en cada momento
            </h2>

            {/* Subtitle */}
            <p ref={subtitleRef} className="text-lg md:text-xl text-warm-white/90 mb-8 leading-relaxed">
              Shows, dinámicas y personajes que encienden cualquier evento: infantiles, XV, bodas y corporativos.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-green-brand text-black hover:brightness-110 focus:ring-2 focus:ring-blue-core text-lg px-8 py-4 font-semibold"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Reserva tu evento
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent ring-1 ring-white/20 text-warm-white hover:bg-white/10 focus:ring-2 focus:ring-blue-core text-lg px-8 py-4 font-semibold"
              >
                <a href="#galeria">Ver galería</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
