"use client"

import type React from "react"

import { useRef, useState } from "react"
import { useGSAP, gsap, initScrollReveal } from "@/lib/gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import SocialIcons from "./social-icons"

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Scroll reveal para los elementos
  initScrollReveal(sectionRef, '.reveal-item', {
    yOffset: 30,
    stagger: 0.2,
    duration: 0.8
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("loading")
    setErrorMessage("")

    // Micro-feedback animation
    if (formRef.current) {
      gsap.to(formRef.current, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.ok) {
        setFormState("success")
        setFormData({ name: "", email: "", message: "" })

        // Reset success state after 5 seconds
        setTimeout(() => setFormState("idle"), 5000)
      } else {
        setFormState("error")
        setErrorMessage(result.error || "Error al enviar el mensaje")
      }
    } catch (error) {
      setFormState("error")
      setErrorMessage("Error de conexión. Inténtalo de nuevo.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

    // Clear error state when user starts typing
    if (formState === "error") {
      setFormState("idle")
      setErrorMessage("")
    }
  }

  const whatsappLink =
    "https://wa.me/527449097483?text=%C2%A1Hola!%20Estoy%20interesado%20vivir%20la%20experiencia%20Chanekes.%20La%20fecha%20de%20mi%20evento%20es%20el:%20"

  return (
    <section id="contacto" ref={sectionRef} className="bg-ink">
      <div className="container max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="text-center mb-16 reveal-item">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-warm-white mb-6">
            Hablemos de <span className="text-green-brand">tu fiesta</span>
          </h2>
          <p className="text-lg md:text-xl text-warm-white/80 max-w-2xl mx-auto">
            Cuéntanos fecha, tipo de evento y número de asistentes. Te respondemos muy rápido.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Contact Form */}
          <div className="max-w-2xl mx-auto reveal-item">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-warm-white text-gray-dark placeholder:text-gray-dark/60 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-core border-0 h-12"
                  required
                  disabled={formState === "loading"}
                />
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Tu email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-warm-white text-gray-dark placeholder:text-gray-dark/60 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-core border-0 h-12"
                  required
                  disabled={formState === "loading"}
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Cuéntanos sobre tu evento (fecha, tipo, número de asistentes...)"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="bg-warm-white text-gray-dark placeholder:text-gray-dark/60 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-core border-0 resize-none"
                  required
                  disabled={formState === "loading"}
                />
              </div>

              {formState === "error" && (
                <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                  {errorMessage}
                </div>
              )}

              {formState === "success" && (
                <div className="text-green-brand text-sm bg-green-brand/10 p-3 rounded-lg border border-green-brand/20">
                  ¡Mensaje enviado correctamente! Te contactaremos pronto.
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={formState === "loading"}
                className="w-full bg-green-brand text-black hover:brightness-110 focus:ring-2 focus:ring-blue-core font-semibold py-6 rounded-lg disabled:opacity-50"
              >
                {formState === "loading" ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </form>
          </div>

          <div className="bg-gray-dark/70 ring-1 ring-white/10 rounded-2xl overflow-hidden reveal-item">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-warm-white mb-6 text-center">Visítanos</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Map */}
                <div>
                  <div className="aspect-video rounded-xl overflow-hidden bg-gray-dark ring-1 ring-white/10">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153167!3d-37.81627997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f3a5c7%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1635959542132!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de Chanekes"
                    ></iframe>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/pVEp1pczVQQQpgo28"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-elec hover:text-blue-elec/80 transition-colors text-sm font-medium"
                  >
                    Ver en Google Maps →
                  </a>
                </div>

                {/* Social Icons and CTA */}
                <div className="flex flex-col justify-center space-y-6">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-warm-white mb-4">Síguenos en redes</h4>
                    <div className="flex justify-center">
                      <SocialIcons />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-warm-white/80 mb-4 text-sm">
                      Agenda una visita o escríbenos por WhatsApp. ¡Planeemos tu fiesta juntos!
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="bg-blue-elec text-black hover:brightness-110 font-semibold rounded-lg px-8"
                    >
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        WhatsApp directo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
