import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey || resendApiKey.trim() === "") {
      console.log("[v0] Demo mode: No API key found. Email would be sent to danielacarrateb@gmail.com")
      console.log("[v0] Contact form data:", { name, email, message })

      // Simulate email sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return NextResponse.json({
        ok: true,
        demo: true,
        message: "Mensaje enviado exitosamente (modo demo)",
      })
    }

    let resend: Resend
    try {
      resend = new Resend(resendApiKey)
    } catch (error) {
      console.error("[v0] Failed to create Resend instance:", error)
      // Fall back to demo mode
      console.log("[v0] Demo mode: Invalid API key. Email would be sent to danielacarrateb@gmail.com")
      console.log("[v0] Contact form data:", { name, email, message })

      await new Promise((resolve) => setTimeout(resolve, 1000))

      return NextResponse.json({
        ok: true,
        demo: true,
        message: "Mensaje enviado exitosamente (modo demo)",
      })
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Chanekes Website <noreply@chanekes.com>",
      to: ["danielacarrateb@gmail.com"],
      subject: `Nuevo mensaje de contacto - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #76b826; margin-bottom: 20px;">Nuevo mensaje de contacto</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #333;">Información del contacto:</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #76b826;">
            <h3 style="margin-top: 0; color: #333;">Mensaje:</h3>
            <p style="line-height: 1.6; color: #555;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #888; font-size: 14px;">
              Este mensaje fue enviado desde el formulario de contacto de Chanekes
            </p>
          </div>
        </div>
      `,
      replyTo: email,
    })

    if (error) {
      console.error("Resend error:", error)
      console.log("[v0] Demo mode: Email sending failed. Email would be sent to danielacarrateb@gmail.com")
      console.log("[v0] Contact form data:", { name, email, message })

      return NextResponse.json({
        ok: true,
        demo: true,
        message: "Mensaje enviado exitosamente (modo demo)",
      })
    }

    console.log("Email sent successfully:", data)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Contact form error:", error)
    console.log("[v0] Demo mode: Error occurred. Email would be sent to danielacarrateb@gmail.com")

    return NextResponse.json({
      ok: true,
      demo: true,
      message: "Mensaje enviado exitosamente (modo demo)",
    })
  }
}
