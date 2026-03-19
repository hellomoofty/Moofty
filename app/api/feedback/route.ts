import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { rating, email, message } = await req.json();

    const data = await resend.emails.send({
      from: 'Moofty Feedback <onboarding@resend.dev>', // Kol neturi savo domeno, naudok šitą
      to: ['tavo@pastas.com'], // ČIA ĮRAŠYK SAVO EL. PAŠTĄ
      subject: `New Feedback: ${rating} Stars ⭐`,
      html: `
        <h1>New Feedback Received</h1>
        <p><strong>Rating:</strong> ${rating} / 5</p>
        <p><strong>User Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Message:</strong> ${message || 'No message'}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
