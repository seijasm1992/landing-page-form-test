'use client';

import { useState, useEffect, useCallback } from 'react';

const TEAL = '#01BF81';
const CYAN = '#41C3D3';
const GRADIENT = `linear-gradient(135deg, ${TEAL}, ${CYAN})`;

const slides = [
  {
    id: 0,
    eyebrow: 'Welcome to Westy Agency',
    titleLight: 'We Create',
    titleBold: 'Beautiful Digital',
    titleEnd: 'Experiences',
    subtitle: 'We craft beautiful, user-centered digital experiences that captivate audiences and drive meaningful results for your brand.',
    img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 1,
    eyebrow: 'Strategy & Creative Direction',
    titleLight: 'Your Vision,',
    titleBold: 'Our Craft',
    titleEnd: 'Perfected',
    subtitle: 'From brand identity to full-scale digital campaigns — we transform your vision into stunning realities with precision.',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 2,
    eyebrow: 'Design & Development',
    titleLight: 'Grow Your',
    titleBold: 'Online Presence',
    titleEnd: 'Today',
    subtitle: 'Strategic design and development that elevates your brand, attracts the right audience, and converts visitors into loyal customers.',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = useCallback((index: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
    }, 450);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 600,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Slide backgrounds */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${s.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        />
      ))}

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(8, 12, 28, 0.72)' }} />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            background: GRADIENT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 20,
          }}
        >
          {slide.eyebrow}
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: 'clamp(40px, 5vw, 66px)',
            lineHeight: 1.1,
            fontWeight: 300,
            color: '#ffffff',
            marginBottom: 24,
          }}
        >
          <span style={{ display: 'block' }}>{slide.titleLight}</span>
          <span
            style={{
              display: 'block',
              fontWeight: 800,
              background: GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {slide.titleBold}
          </span>
          <span style={{ display: 'block' }}>{slide.titleEnd}</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 15,
            lineHeight: 1.85,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.78)',
            maxWidth: 560,
            marginBottom: 40,
          }}
        >
          {slide.subtitle}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <a
            href="#about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 36px',
              borderRadius: 5,
              background: GRADIENT,
              color: '#ffffff',
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(1,191,129,0.35)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            Explore Our Work
          </a>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 34px',
              borderRadius: 5,
              border: '2px solid rgba(255,255,255,0.55)',
              color: '#ffffff',
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.25s ease, border-color 0.25s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? 32 : 10,
              height: 10,
              borderRadius: 99,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.35s ease',
              background: i === current ? GRADIENT : 'rgba(255,255,255,0.35)',
              boxShadow: i === current ? '0 0 10px rgba(1,191,129,0.5)' : 'none',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          right: 32,
          zIndex: 20,
          fontFamily: "'Raleway', sans-serif",
          fontSize: 13,
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        <span style={{ color: '#ffffff', fontWeight: 700 }}>{String(current + 1).padStart(2, '0')}</span>
        {' / '}
        {String(slides.length).padStart(2, '0')}
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          left: 32,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div style={{ width: 1, height: 56, overflow: 'hidden', position: 'relative' }}>
          <div
            className="scroll-line"
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to bottom, ${TEAL}, transparent)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
