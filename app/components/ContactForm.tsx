'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/contactSchema';

const TEAL = '#01BF81';
const CYAN = '#41C3D3';
const GRADIENT = `linear-gradient(135deg, ${TEAL}, ${CYAN})`;

// ─── Small helpers ────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        display: 'block',
        fontFamily: "'Raleway', sans-serif",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: '#8a8b8e',
        marginBottom: 6,
      }}
    >
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p style={{ fontSize: 12, color: '#e05252', marginTop: 4, fontFamily: "'Poppins', sans-serif" }}>
      {message}
    </p>
  );
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: '100%',
    padding: '13px 16px',
    background: '#ffffff',
    border: `1.5px solid ${hasError ? '#e05252' : '#e8ecf0'}`,
    borderRadius: 5,
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    color: '#3d465a',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box',
  };
}

// ─── Contact info items ───────────────────────────────────────────────────────
const contactItems = [
  {
    label: 'Teléfono',
    value: '+1 (555) 000-0000',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'hola@westyagency.com',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Dirección',
    value: '4655 Carter Street, Olney, Illinois',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    setServerError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error || 'Error al enviar el mensaje.');
        setStatus('error');
      } else {
        setStatus('success');
        reset();
      }
    } catch {
      setServerError('No se pudo conectar con el servidor. Inténtalo más tarde.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ background: '#f8f9fa' }}>
      {/* ── Form area ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 24px 80px' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              background: GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 14,
            }}
          >
            Contáctanos
          </p>

          <h2
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 300,
              color: '#3d465a',
              marginBottom: 12,
            }}
          >
            Envíanos un{' '}
            <span style={{ fontWeight: 800, background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Mensaje
            </span>
          </h2>

          {/* Teal underline accent — Simba style */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ width: 48, height: 2, borderRadius: 2, background: GRADIENT }} />
          </div>

          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: '#8a8b8e', maxWidth: 520, margin: '0 auto' }}>
            Somos una apasionada agencia de diseño digital. Cuéntanos sobre tu proyecto y te responderemos a la brevedad.
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Row 1: Name | Email | Subject */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 20,
              marginBottom: 20,
            }}
          >
            {/* Name */}
            <div>
              <Label>Nombre *</Label>
              <input
                {...register('name')}
                type="text"
                placeholder="Tu nombre completo"
                style={inputStyle(!!errors.name)}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = TEAL;
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(1,191,129,0.12)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = errors.name ? '#e05252' : '#e8ecf0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <FieldError message={errors.name?.message} />
            </div>

            {/* Email */}
            <div>
              <Label>Correo electrónico *</Label>
              <input
                {...register('email')}
                type="email"
                placeholder="tu@correo.com"
                style={inputStyle(!!errors.email)}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = TEAL;
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(1,191,129,0.12)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = errors.email ? '#e05252' : '#e8ecf0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <FieldError message={errors.email?.message} />
            </div>

            {/* Subject */}
            <div>
              <Label>Asunto *</Label>
              <input
                {...register('subject')}
                type="text"
                placeholder="¿En qué podemos ayudarte?"
                style={inputStyle(!!errors.subject)}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = TEAL;
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(1,191,129,0.12)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = errors.subject ? '#e05252' : '#e8ecf0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <FieldError message={errors.subject?.message} />
            </div>
          </div>

          {/* Row 2: Message */}
          <div style={{ marginBottom: 28 }}>
            <Label>Mensaje *</Label>
            <textarea
              {...register('message')}
              rows={6}
              placeholder="Cuéntanos más sobre tu proyecto o consulta..."
              style={{ ...inputStyle(!!errors.message), resize: 'vertical', minHeight: 140 }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = TEAL;
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(1,191,129,0.12)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = errors.message ? '#e05252' : '#e8ecf0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <FieldError message={errors.message?.message} />
          </div>

          {/* Success / Error banners */}
          {status === 'success' && (
            <div
              style={{
                marginBottom: 20,
                padding: '14px 20px',
                borderRadius: 5,
                background: 'rgba(1,191,129,0.1)',
                border: '1px solid rgba(1,191,129,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={TEAL} strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: '#01BF81', margin: 0 }}>
                ¡Mensaje enviado! Te responderemos pronto.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div
              style={{
                marginBottom: 20,
                padding: '14px 20px',
                borderRadius: 5,
                background: 'rgba(224,82,82,0.08)',
                border: '1px solid rgba(224,82,82,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#e05252" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: '#e05252', margin: 0 }}>
                {serverError}
              </p>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 40px',
              borderRadius: 5,
              border: 'none',
              background: status === 'loading' ? 'rgba(1,191,129,0.6)' : GRADIENT,
              color: '#ffffff',
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 30px rgba(1,191,129,0.3)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (status !== 'loading') (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            {status === 'loading' ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ animation: 'spin 0.8s linear infinite' }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                </svg>
                Enviando...
              </>
            ) : (
              <>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Enviar Mensaje
              </>
            )}
          </button>
        </form>
      </div>

      {/* ── Dark footer strip — Simba style ── */}
      <div style={{ background: '#0d1117', padding: '40px 24px' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 32,
          }}
        >
          {contactItems.map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              {/* Icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: GRADIENT,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 6px 18px rgba(1,191,129,0.3)',
                }}
              >
                {item.icon}
              </div>
              {/* Text */}
              <div>
                <p
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: TEAL,
                    margin: '0 0 4px',
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.65)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
