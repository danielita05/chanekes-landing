"use client"

import { useRef } from "react"
import { useGSAP, gsap, initScrollReveal, ANIMATION_CONFIG } from "@/lib/gsap"
import { usePrefersReducedMotion } from "@/src/hooks/usePrefersReducedMotion"

const testimonials = [
  {
    text: "¡Increíbles! Mantuvieron a todos bailando durante toda la fiesta. Los niños no pararon de reír y los adultos también se divirtieron muchísimo.",
    author: "María González",
    event: "Fiesta infantil",
  },
  {
    text: "Profesionales y puntuales. El show temático de vaqueros fue espectacular y realmente encendió nuestra boda. ¡Todos nuestros invitados quedaron fascinados!",
    author: "Eduardo y Carmen Ramírez",
    event: "Boda",
  },
  {
    text: "Contratamos el paquete completo para los XV de nuestra hija y fue un éxito total. La animación fue elegante y divertida a la vez.",
    author: "Familia Pérez",
    event: "XV años",
  },
  {
    text: "Para nuestro evento corporativo necesitábamos algo profesional pero entretenido. Chanekes logró el equilibrio perfecto. ¡Altamente recomendados!",
    author: "Ana Martínez",
    event: "Evento corporativo",
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Scroll reveal para título
  initScrollReveal(sectionRef, '.reveal-item', {
    yOffset: 30,
    duration: 0.8
  })

  // Animación alternada para testimonials (izquierda/derecha)
  useGSAP(() => {
    if (prefersReducedMotion || !cardsRef.current) return

    const cards = cardsRef.current.children
    
    Array.from(cards).forEach((card, index) => {
      const direction = index % 2 === 0 ? -60 : 60
      
      gsap.set(card, {
        opacity: 0,
        x: direction
      })
      
      gsap.to(card, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: ANIMATION_CONFIG.scroll.ease,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
      
      // Hover effect
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.02,
          rotateY: index % 2 === 0 ? 2 : -2,
          duration: ANIMATION_CONFIG.hover.duration,
          ease: ANIMATION_CONFIG.hover.tilt.ease
        })
      }
      
      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          rotateY: 0,
          duration: ANIMATION_CONFIG.hover.duration,
          ease: ANIMATION_CONFIG.hover.tilt.ease
        })
      }
      
      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mouseleave', handleMouseLeave)
    })
  }, { scope: cardsRef })

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-ink">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 reveal-item">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-warm-white mb-4">
            Lo que dicen de <span className="text-green-brand">Chanekes</span>
          </h2>
          <p className="text-lg text-warm-white/80 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card p-8 rounded-2xl bg-gray-dark/70 ring-1 ring-white/10 hover:ring-green-brand/30 hover:shadow-xl hover:shadow-green-brand/10 transition-all duration-300"
              style={{ willChange: 'transform' }}
            >
              <div className="mb-6">
                <div className="text-5xl text-green-brand mb-4 font-serif">"</div>
                <p className="text-warm-white text-lg leading-relaxed mb-4">{testimonial.text}</p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="text-green-brand font-semibold text-lg">— {testimonial.author}</div>
                <div className="text-blue-elec text-sm mt-1">{testimonial.event}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
