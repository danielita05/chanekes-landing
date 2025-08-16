"use client"
import { useRef } from "react"
import { useGSAP, gsap, ANIMATION_CONFIG } from "@/lib/gsap"
import { usePrefersReducedMotion } from "@/src/hooks/usePrefersReducedMotion"
import Image from "next/image"

const ITEMS = [
  { title: "Animación infantil", desc: "Juegos y dinámicas.", img: "/colorful-children-party-games.png" },
  { title: "Shows temáticos", desc: "Vaqueros, superhéroes…", img: "/cowboys-superheroes-show.png" },
  { title: "Dinámicas interactivas", desc: "Concursos y bailes.", img: "/interactive-dancing-contest.png" },
  { title: "Personajes sorpresa", desc: "Momentos épicos.", img: "/surprise-characters-party.png" },
  { title: "Staff y performance", desc: "Energía Chanekes.", img: "/staff-performance-energy-entertainment.png" },
]

export default function ServicesScroller() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Auto-scroll y animaciones de hover
  useGSAP(() => {
    if (prefersReducedMotion || !wrapRef.current) return

    const el = wrapRef.current
    
    // Auto-scroll suave y retorno
    const scrollTween = gsap.to(el, {
      scrollLeft: () => el.scrollWidth - el.clientWidth,
      duration: 14,
      repeat: -1,
      yoyo: true,
      ease: "none",
    })

    // Hover effects en las cards
    const cards = el.querySelectorAll('.service-card')
    
    cards.forEach(card => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.02,
          rotateY: 2,
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

    // Pausa al interactuar
    const stop = () => scrollTween.pause()
    const play = () => scrollTween.resume()
    
    el.addEventListener("pointerdown", stop)
    el.addEventListener("pointerup", play)
    el.addEventListener("mouseenter", stop)
    el.addEventListener("mouseleave", play)
    
    return () => {
      scrollTween.kill()
      el.removeEventListener("pointerdown", stop)
      el.removeEventListener("pointerup", play)
      el.removeEventListener("mouseenter", stop)
      el.removeEventListener("mouseleave", play)
    }
  }, { scope: wrapRef })

  return (
    <div ref={wrapRef} className="overflow-x-auto snap-x snap-mandatory scrollbar-none">
      <div className="flex gap-6 md:gap-8 px-1 py-2">
        {ITEMS.map((it, i) => (
          <article
            key={i}
            className="service-card snap-start min-w-[260px] md:min-w-[320px] bg-gray-dark/70 ring-1 ring-white/10 rounded-2xl p-5 md:p-6 text-warm-white hover:ring-green-brand hover:shadow-lg hover:shadow-green-brand/20 transition-all duration-300"
            style={{ willChange: 'transform' }}
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl mb-4 bg-black/30">
              <Image 
                src={it.img || "/placeholder.svg"} 
                alt={it.title} 
                fill 
                className="object-cover transition-transform duration-300 hover:scale-105" 
              />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-green-brand">{it.title}</h3>
            <p className="text-warm-white/80 text-sm md:text-base mt-1">{it.desc}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
