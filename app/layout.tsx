import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Chanekes - Animación de Fiestas | Shows y Dinámicas para tu Evento",
  description:
    "Servicios profesionales de animación para fiestas infantiles, XV años, bodas y eventos corporativos. Shows temáticos, dinámicas interactivas y personajes que encienden cualquier celebración.",
  keywords:
    "animación fiestas, shows infantiles, eventos, XV años, bodas, animadores profesionales, dinámicas interactivas",
  authors: [{ name: "Chanekes" }],
  creator: "Chanekes",
  publisher: "Chanekes",
  robots: "index, follow",
  openGraph: {
    title: "Chanekes - La emoción de tu fiesta en cada momento",
    description: "Shows, dinámicas y personajes que encienden cualquier evento: infantiles, XV, bodas y corporativos.",
    url: "https://chanekes.com.mx",
    siteName: "Chanekes",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chanekes - Animación de Fiestas",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chanekes - Animación de Fiestas",
    description: "Shows, dinámicas y personajes que encienden cualquier evento",
    images: ["/og-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#222333",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={poppins.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}
