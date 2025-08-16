"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
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

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    // auto-scroll suave y retorno (no invasivo)
    const tween = gsap.to(el, {
      scrollLeft: () => el.scrollWidth - el.clientWidth,
      duration: 14,
      repeat: -1,
      yoyo: true,
      ease: "none",
      paused: false,
    })

    // pausa al interactuar
    const stop = () => tween.pause()
    const play = () => tween.resume()
    el.addEventListener("pointerdown", stop)
    el.addEventListener("pointerup", play)
    el.addEventListener("mouseenter", stop)
    el.addEventListener("mouseleave", play)
    return () => {
      tween.kill()
      el.removeEventListener("pointerdown", stop)
      el.removeEventListener("pointerup", play)
      el.removeEventListener("mouseenter", stop)
      el.removeEventListener("mouseleave", play)
    }
  }, [])

  return (
    <div ref={wrapRef} className="overflow-x-auto snap-x snap-mandatory scrollbar-none">
      <div className="flex gap-6 md:gap-8 px-1 py-2">
        {ITEMS.map((it, i) => (
          <article
            key={i}
            className="snap-start min-w-[260px] md:min-w-[320px] bg-gray-dark/70 ring-1 ring-white/10 rounded-2xl p-5 md:p-6 text-warm-white hover:ring-green-brand transition-colors"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl mb-4 bg-black/30">
              <Image src={it.img || "/placeholder.svg"} alt={it.title} fill className="object-cover" />
            </div>
            <h3 className="text-lg md:text-xl font-bold">{it.title}</h3>
            <p className="text-warm-white/80 text-sm md:text-base mt-1">{it.desc}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
