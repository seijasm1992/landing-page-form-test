'use client';

import { useEffect, useRef, useState } from 'react';

const TEAL = '#01BF81';
const CYAN = '#41C3D3';
const GRADIENT = `linear-gradient(135deg, ${TEAL}, ${CYAN})`;

const features = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Safe & Secure',
    description: 'We strive to be the best and make Awesome Work.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Quick Settings',
    description: 'We strive to be the best and make Awesome Work.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: 'Modern Design',
    description: 'We strive to be the best and make Awesome Work.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'User Interface',
    description: 'We strive to be the best and make Awesome Work.',
  },
];

export default function Introduction() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{ padding: '120px 0', background: '#ffffff' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <div
          style={{
            maxWidth: 620,
            marginBottom: 64,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {/* Tag */}
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
            Introduction
          </p>

          <h2
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 500,
              lineHeight: 1.4,
              color: '#3d465a',
              marginBottom: 20,
            }}
          >
            Your logo is the very heart of your identity, let our designers deliver the{' '}
            <span
              style={{
                fontWeight: 800,
                background: GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              perfect &amp; dreamy
            </span>{' '}
            design.
          </h2>

          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 14,
              lineHeight: 1.85,
              fontWeight: 400,
              color: '#8a8b8e',
            }}
          >
            Nulla metus metus ullamcorper vel tincidunt sed euismod nibh Quisque volutpat
            condimentum velit class aptent taciti sociosqu ad litora torquent per conubia nostra.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
          }}
        >
          {features.map((feature, i) => (
            <CardItem
              key={feature.title}
              feature={feature}
              delay={i * 100}
              visible={visible}
              gradient={GRADIENT}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CardItem({
  feature,
  delay,
  visible,
  gradient,
}: {
  feature: { icon: React.ReactNode; title: string; description: string };
  delay: number;
  visible: boolean;
  gradient: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        borderRadius: 8,
        padding: '36px 28px',
        border: hovered ? '1px solid transparent' : '1px solid #f0f0f0',
        boxShadow: hovered
          ? '0 20px 50px rgba(1,191,129,0.12)'
          : '0 10px 30px rgba(0,0,0,0.05)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        cursor: 'default',
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          boxShadow: '0 8px 20px rgba(1,191,129,0.3)',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.3s ease',
        }}
      >
        {feature.icon}
      </div>

      <h3
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: '#3d465a',
          marginBottom: 12,
        }}
      >
        {feature.title}
      </h3>

      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 13,
          lineHeight: 1.85,
          fontWeight: 400,
          color: '#8a8b8e',
        }}
      >
        {feature.description}
      </p>

      {/* Bottom line */}
      <div
        style={{
          marginTop: 24,
          height: 2,
          width: hovered ? '100%' : 0,
          borderRadius: 4,
          background: gradient,
          transition: 'width 0.45s ease',
        }}
      />
    </div>
  );
}
