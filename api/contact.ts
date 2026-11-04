import { z } from 'zod';
import { Resend } from 'resend';

// Strict validation schema
const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid email address'),
  subject: z.enum(['Job opportunity', 'Research collaboration', 'Other'], {
    errorMap: () => ({ message: 'Please select a valid subject' })
  }),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(3000),
  // Honeypot field - must be empty from human users
  company_fax_hp: z.string().optional()
});

// Basic sliding window rate limiting (in-memory for serverless edge/node instance)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(req: Request) {
  try {
    // 1. IP extraction for rate limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Too many requests. Please try again in a few minutes.'
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Parse body
    const rawBody = await req.json().catch(() => null);
    if (!rawBody) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid JSON payload.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 3. Honeypot check
    if (rawBody.company_fax_hp && String(rawBody.company_fax_hp).trim().length > 0) {
      // Silently discard bot submission
      return new Response(
        JSON.stringify({ success: true, message: 'Message sent successfully.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4. Validate with Zod
    const validationResult = contactSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Validation failed',
          details: fieldErrors
        }),
        { status: 422, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    // 5. Check Resend API key
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL_TO || 'dhikamahesa45@gmail.com';
    const senderEmail = process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev';

    if (!resendApiKey || resendApiKey.includes('your_api_key')) {
      // Graceful fallback to mailto when env var is missing or unconfigured
      const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
        `[Portfolio] ${subject} from ${name}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
      )}`;

      return new Response(
        JSON.stringify({
          success: true,
          fallback: true,
          mailto: mailtoUrl,
          message:
            'Direct email transmission is not configured in this environment. Falling back to your email client.'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 6. Send email via Resend
    const resend = new Resend(resendApiKey);
    const { error: sendError } = await resend.emails.send({
      from: `Portfolio Contact <${senderEmail}>`,
      to: [recipientEmail],
      replyTo: email,
      subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
      text: `New contact form submission from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nIP: ${ip}\nSent At: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a; margin-top: 0;">New Portfolio Contact Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 100px;">From:</td><td>${name} (&lt;${email}&gt;)</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Subject:</td><td>${subject}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Date:</td><td>${new Date().toLocaleString()}</td></tr>
          </table>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #10b981;">
            <p style="margin: 0; white-space: pre-wrap; color: #1e293b; line-height: 1.6;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #64748b;">
            Sent from Dhika Mahesa Syaputra Portfolio contact form.
          </p>
        </div>
      `
    });

    if (sendError) {
      console.error('Resend error:', sendError);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to send message via email provider. Please contact directly via email.',
          mailto: `mailto:${recipientEmail}?subject=${encodeURIComponent(
            `[Portfolio] ${subject} from ${name}`
          )}`
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your message has been sent successfully! Dhika will get back to you shortly.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    console.error('Contact handler uncaught error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error:
          'An unexpected server error occurred. Please try again or reach out via email directly.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
