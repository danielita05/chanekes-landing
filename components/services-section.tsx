"use client"

import { useRef } from "react"
import { initScrollReveal } from "@/lib/gsap"
import AnimatedHeading from "@/components/AnimatedHeading"
import ServicesScroller from "@/components/ServicesScroller"

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Scroll reveal para los elementos
  initScrollReveal(sectionRef, '.reveal-item', {
    yOffset: 30,
    stagger: 0.1,
    duration: 0.8
  })

  return (
    <section ref={sectionRef} className="bg-ink py-16 md:py-20" id="servicios">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-12 reveal-item">
          <AnimatedHeading
            text="Nuestros servicios"
            as="h2"
            glow="magenta"
            className="text-3xl md:text-5xl font-extrabold text-warm-white mb-6 text-center"
          />
          <p className="text-warm-white/80 max-w-3xl mx-auto text-center text-lg">
            Servicios profesionales que transforman cualquier celebración en una experiencia inolvidable
          </p>
        </div>

        <div className="reveal-item">
          <ServicesScroller />
        </div>
      </div>
    </section>
  )
}
