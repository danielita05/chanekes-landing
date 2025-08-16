"use client"

import { useRef } from "react"
import { useGSAP, gsap, initScrollReveal, ANIMATION_CONFIG } from "@/lib/gsap"
import { usePrefersReducedMotion } from "@/src/hooks/usePrefersReducedMotion"
import Image from "next/image"

const galleryItems = [
  { type: "image", src: "/happy-children-party.png", alt: "Animación infantil con niños felices" },
  { type: "image", src: "/themed-party-show.png", alt: "Show temático profesional" },
  { type: "image", src: "/colorful-childrens-party.png", alt: "Fiesta colorida para niños" },
  { type: "image", src: "/interactive-party-games.png", alt: "Juegos interactivos y dinámicas" },
  { type: "image", src: "/elegant-quinceanera-entertainment.png", alt: "Animación elegante para XV años" },
  { type: "image", src: "/professional-entertainment.png", alt: "Entretenimiento profesional" },
  { type: "image", src: "/surprise-party-guest.png", alt: "Personajes sorpresa" },
  { type: "image", src: "/themed-party.png", alt: "Fiestas temáticas personalizadas" },
  { type: "image", src: "/colorful-dance-party.png", alt: "Bailes y coreografías" },
]

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Scroll reveal para título y texto
  initScrollReveal(sectionRef, '.reveal-item', {
    yOffset: 40,
    duration: 0.8,
    stagger: 0.2
  })

  // Animación en cascada para las imágenes (wave effect)
  useGSAP(() => {
    if (prefersReducedMotion || !gridRef.current) return

    const items = gridRef.current.children
    
    gsap.set(items, {
      opacity: 0,
      scale: 0.8,
      rotateY: 15
    })

    gsap.to(items, {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      duration: 0.8,
      stagger: {
        amount: 1.5,
        grid: [3, 3],
        from: "start",
        ease: "power2.out"
      },
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse"
      }
    })

    // Hover micro-animations
    Array.from(items).forEach((item, index) => {
      const handleMouseEnter = () => {
        gsap.to(item, {
          rotateY: -3,
          rotateX: 2,
          scale: 1.02,
          duration: ANIMATION_CONFIG.hover.duration,
          ease: ANIMATION_CONFIG.hover.tilt.ease
        })
      }
      
      const handleMouseLeave = () => {
        gsap.to(item, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: ANIMATION_CONFIG.hover.duration,
          ease: ANIMATION_CONFIG.hover.tilt.ease
        })
      }
      
      item.addEventListener('mouseenter', handleMouseEnter)
      item.addEventListener('mouseleave', handleMouseLeave)
    })
  }, { scope: gridRef })

  return (
    <section id="galeria" ref={sectionRef} className="py-16 md:py-20 bg-gray-dark">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="reveal-item text-4xl md:text-5xl lg:text-6xl font-bold text-warm-white mb-4">
            Un vistazo a la <span className="text-blue-elec">diversión en vivo</span>
          </h2>
          <p className="reveal-item text-lg text-warm-white/80 max-w-2xl mx-auto">
            Más de 500 fiestas animadas y 1000+ niños felices. Creamos experiencias únicas para todas las edades.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="gallery-item group relative aspect-video overflow-hidden rounded-2xl bg-ink ring-1 ring-white/10 hover:ring-green-brand/50 hover:shadow-xl hover:shadow-green-brand/20 transition-all duration-300 cursor-pointer"
              style={{ willChange: 'transform' }}
            >
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-warm-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.alt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
