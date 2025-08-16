"use client"
import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export default function RevealOnScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const items = gsap.utils.toArray<HTMLElement>(".reveal")
    items.forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: reduce ? 0 : 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: reduce ? 0.25 : 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        },
      )
    })
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])
  return null
}
