"use client"

import { useRef } from "react"
import { initScrollReveal } from "@/lib/gsap"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Scroll reveal para los elementos
  initScrollReveal(sectionRef, '.reveal-item', {
    yOffset: 40,
    stagger: 0.2,
    duration: 0.8
  })

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gray-dark">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16 reveal-item">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-warm-white mb-6">
            Animamos tu fiesta, <span className="text-green-brand">elevamos tu evento</span>
          </h2>
          <p className="text-lg md:text-xl text-warm-white/80 max-w-3xl mx-auto leading-relaxed">
            Más de 500 fiestas animadas y 1000+ niños felices. Creamos experiencias únicas para todas las edades.
          </p>
        </div>

        {/* Stats badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto reveal-item">
          <div className="text-center p-8 rounded-2xl bg-ink/50 ring-1 ring-green-brand/20 hover:ring-green-brand/40 hover-lift transition-all duration-300">
            <div className="text-5xl font-bold text-green-brand mb-3">500+</div>
            <div className="text-warm-white/80 text-lg">Fiestas realizadas</div>
          </div>

          <div className="text-center p-8 rounded-2xl bg-ink/50 ring-1 ring-blue-elec/20 hover:ring-blue-elec/40 hover-lift transition-all duration-300">
            <div className="text-5xl font-bold text-blue-elec mb-3">1000+</div>
            <div className="text-warm-white/80 text-lg">Niños felices</div>
          </div>

          <div className="text-center p-8 rounded-2xl bg-ink/50 ring-1 ring-blue-core/20 hover:ring-blue-core/40 hover-lift transition-all duration-300">
            <div className="text-5xl font-bold text-blue-core mb-3">5+</div>
            <div className="text-warm-white/80 text-lg">Años de experiencia</div>
          </div>
        </div>
      </div>
    </section>
  )
}
