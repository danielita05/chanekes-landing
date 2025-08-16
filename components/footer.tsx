import Image from "next/image"
import SocialIcons from "./social-icons"

export default function Footer() {
  const whatsappLink =
    "https://wa.me/527449097483?text=%C2%A1Hola!%20Estoy%20interesado%20vivir%20la%20experiencia%20Chanekes.%20La%20fecha%20de%20mi%20evento%20es%20el:%20"

  return (
    <footer className="bg-black py-12">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/logo-chanekes.png"
              alt="Chanekes Logo"
              width={150}
              height={45}
              className="w-auto h-10 md:h-12"
            />
          </div>

          {/* Navigation */}
          <nav className="flex justify-center">
            <ul className="flex flex-wrap justify-center gap-6 text-warm-white/80 text-sm">
              <li>
                <a href="#inicio" className="hover:text-green-brand transition-colors focus-visible">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-green-brand transition-colors focus-visible">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-green-brand transition-colors focus-visible">
                  Galería
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-green-brand transition-colors focus-visible">
                  Contacto
                </a>
              </li>
            </ul>
          </nav>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end">
            <SocialIcons className="gap-3" />
          </div>
        </div>

        <div className="border-t border-warm-white/20 mt-8 pt-8 text-center">
          <p className="text-warm-white/60 text-sm">
            © 2024 Chanekes. Todos los derechos reservados. | Animación de fiestas profesional
          </p>
        </div>
      </div>
    </footer>
  )
}
