'use client';

import { useState, useEffect, useRef } from 'react';

const TEAL = '#01BF81';
const CYAN = '#41C3D3';
const GRADIENT = `linear-gradient(135deg, ${TEAL}, ${CYAN})`;

interface VideoModalProps {
  onClose: () => void;
}

function VideoModal({ onClose }: VideoModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative', width: '100%', maxWidth: 900,
          borderRadius: 8, overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          style={{
            position: 'absolute', top: 12, right: 12, zIndex: 10,
            width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,0.18)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.35)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.18)'; }}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div style={{ aspectRatio: '16/9', background: '#000' }}>
          <iframe
            style={{ width: '100%', height: '100%', display: 'block' }}
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
            title="Westy Agency Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default function CtaBanner() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}

      <section
        id="work"
        ref={ref}
        style={{
          position: 'relative',
          padding: '140px 0',
          overflow: 'hidden',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 14, 28, 0.82)' }} />

        {/* Subtle dot pattern */}
        <div
          style={{
            position: 'absolute', inset: 0, opacity: 0.06,
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative', zIndex: 10,
            maxWidth: 860,
            margin: '0 auto',
            padding: '0 24px',
            textAlign: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {/* Tag */}
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              background: GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 16,
            }}
          >
            Digital Agency
          </p>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: 'clamp(30px, 4vw, 52px)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#ffffff',
              marginBottom: 20,
            }}
          >
            Creative &amp; Perfect Design{' '}
            <span
              style={{
                background: GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              For Digital Agency
            </span>
          </h2>

          {/* Sub-text */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 15,
              lineHeight: 1.85,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 580,
              margin: '0 auto 48px',
            }}
          >
            What separates Westy from all other web design agencies is the ability to offer the most{' '}
            <strong style={{ color: '#ffffff', fontWeight: 600 }}>Friendly Experience</strong> you can imagine.
          </p>

          {/* ── Play button ── clean flex row, no absolute positioning ── */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => setVideoOpen(true)}
              aria-label="Watch Our Story"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 20,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              {/* Circle with pulsing rings */}
              <span style={{ position: 'relative', flexShrink: 0, width: 72, height: 72 }}>
                {/* ring A */}
                <span
                  className="pulse-a"
                  style={{
                    position: 'absolute', inset: -10,
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.25)',
                  }}
                />
                {/* ring B */}
                <span
                  className="pulse-b"
                  style={{
                    position: 'absolute', inset: -10,
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.15)',
                  }}
                />
                {/* Play icon */}
                <span
                  style={{
                    position: 'absolute', inset: 0,
                    borderRadius: '50%',
                    background: GRADIENT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 40px rgba(1,191,129,0.45)',
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 4 }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>

              {/* Label */}
              <span
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '0.5px',
                }}
              >
                Watch Our Story
              </span>
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              marginTop: 80,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 32,
            }}
          >
            {[
              { value: '280+', label: 'Clients Served' },
              { value: '15+', label: 'Years Experience' },
              { value: '99%', label: 'Satisfaction Rate' },
              { value: '50+', label: 'Awards Won' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: 40,
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: 6,
                    lineHeight: 1,
                  }}
                >
                  <span
                    style={{
                      background: GRADIENT,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </span>
                </p>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 11,
                    fontWeight: 400,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
