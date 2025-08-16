"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useGSAPContext, ANIMATION_CONFIG } from "@/lib/gsap"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import AnimatedHeading from "@/components/AnimatedHeading"
import { useNeonPulse } from "@/components/useNeonPulse"

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const ctx = useGSAPContext()

  useNeonPulse(".hero-title .ah-letter")

  useEffect(() => {
    if (!ctx || !heroRef.current) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    ctx.add(() => {
      const circles = heroRef.current?.querySelectorAll(".bouncing-circle")
      if (circles) {
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
      }

      const tl = gsap.timeline({ delay: 1.5 })

      tl.from(titleRef.current, {
        autoAlpha: 0,
        y: 50,
        duration: ANIMATION_CONFIG.hero.duration,
        ease: ANIMATION_CONFIG.hero.ease,
      })
        .from(
          subtitleRef.current,
          {
            autoAlpha: 0,
            y: 30,
            duration: ANIMATION_CONFIG.hero.duration,
            ease: ANIMATION_CONFIG.hero.ease,
          },
          `-=${ANIMATION_CONFIG.hero.duration * 0.7}`,
        )
        .from(
          ctaRef.current?.children || [],
          {
            autoAlpha: 0,
            y: 20,
            duration: ANIMATION_CONFIG.hero.duration,
            stagger: ANIMATION_CONFIG.hero.stagger,
            ease: ANIMATION_CONFIG.hero.ease,
          },
          `-=${ANIMATION_CONFIG.hero.duration * 0.5}`,
        )
    })
  }, [ctx])

  const whatsappLink =
    "https://wa.me/527449097483?text=%C2%A1Hola!%20Estoy%20interesado%20vivir%20la%20experiencia%20Chanekes.%20La%20fecha%20de%20mi%20evento%20es%20el:%20"

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink">
      <div className="absolute top-20 left-20 w-16 h-16 opacity-60 pointer-events-none">
        <Image src="/bouncing-circles.svg" alt="" width={64} height={64} className="bouncing-circle" />
      </div>
      <div className="absolute top-40 right-32 w-12 h-12 opacity-40 pointer-events-none">
        <Image src="/bouncing-circles.svg" alt="" width={48} height={48} className="bouncing-circle" />
      </div>
      <div className="absolute bottom-32 left-1/3 w-20 h-20 opacity-50 pointer-events-none">
        <Image src="/bouncing-circles.svg" alt="" width={80} height={80} className="bouncing-circle" />
      </div>

      <div className="container max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Logo Column */}
          <div ref={logoRef} className="flex justify-center lg:justify-end">
            <Image
              src="/logo-chanekes.png"
              alt="Chanekes Logo"
              width={300}
              height={300}
              priority
              className="w-64 h-64 lg:w-80 lg:h-80 object-contain"
            />
          </div>

          {/* Content Column */}
          <div className="text-center lg:text-left">
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
