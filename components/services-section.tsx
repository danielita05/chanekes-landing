"use client"

import AnimatedHeading from "@/components/AnimatedHeading"
import ServicesScroller from "@/components/ServicesScroller"

export default function ServicesSection() {
  return (
    <section className="bg-ink py-16 md:py-20">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-12">
          <AnimatedHeading
            text="Nuestros servicios"
            as="h2"
            glow="magenta"
            className="text-3xl md:text-5xl font-extrabold text-warm-white mb-6 text-center"
          />
          <p className="reveal text-warm-white/80 max-w-3xl mx-auto text-center text-lg">
            Servicios profesionales que transforman cualquier celebración en una experiencia inolvidable
          </p>
        </div>

        <ServicesScroller />
      </div>
    </section>
  )
}
