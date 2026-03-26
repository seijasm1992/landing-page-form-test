import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/contactSchema';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos.', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;
    const toEmail = process.env.CONTACT_EMAIL;

    if (!toEmail) {
      console.error('CONTACT_EMAIL not set in .env.local');
      return NextResponse.json(
        { error: 'Configuración del servidor incompleta.' },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: 'Westy Contact Form <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: email,
      subject: `[Westy] ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e8e8e8; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #01BF81, #41C3D3); padding: 32px 40px;">
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px;">Westy Agency</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">Nuevo mensaje del formulario de contacto</p>
          </div>
          <!-- Body -->
          <div style="padding: 36px 40px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; width: 110px;">
                  <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #8a8b8e;">Nombre</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                  <span style="font-size: 15px; color: #3d465a;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                  <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #8a8b8e;">Email</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                  <a href="mailto:${email}" style="font-size: 15px; color: #01BF81; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                  <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #8a8b8e;">Asunto</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                  <span style="font-size: 15px; color: #3d465a;">${subject}</span>
                </td>
              </tr>
            </table>

            <div style="margin-top: 28px;">
              <p style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #8a8b8e; margin: 0 0 12px;">Mensaje</p>
              <div style="background: #f8f9fa; border-left: 3px solid #01BF81; border-radius: 4px; padding: 20px 24px;">
                <p style="font-size: 15px; line-height: 1.75; color: #3d465a; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px 40px; border-top: 1px solid #e8e8e8;">
            <p style="font-size: 12px; color: #8a8b8e; margin: 0;">Este correo fue enviado desde el formulario de contacto de <strong style="color: #3d465a;">westyagency.com</strong></p>
            <p style="font-size: 12px; color: #8a8b8e; margin: 4px 0 0;">Puedes responder directamente a este correo para contactar a ${name}.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'No se pudo enviar el correo. Inténtalo más tarde.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
