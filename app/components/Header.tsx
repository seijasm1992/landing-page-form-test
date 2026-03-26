'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#price', label: 'Price' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.05)] translate-y-0'
          : 'bg-transparent translate-y-0'
      }`}
      style={{ transitionDuration: '350ms' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-3 group">
          <div
            className="w-8 h-8 rounded flex items-center justify-center"
            style={{ background: 'linear-gradient(to bottom right, #01BF81, #41C3D3)' }}
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{
              fontFamily: "'Raleway', sans-serif",
              color: scrolled ? '#3d465a' : '#fff',
              transition: 'color 0.35s ease',
            }}
          >
            Westy
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.label)}
              className={`text-[13px] font-medium tracking-[0.5px] transition-all duration-300 relative group ${
                active === link.label
                  ? 'nav-link-active'
                  : scrolled
                  ? 'text-[#3d465a] hover:text-transparent'
                  : 'text-white/90 hover:text-white'
              }`}
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              {link.label}
              {/* gradient underline */}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-300 ${
                  active === link.label ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
                style={{ background: 'linear-gradient(to right, #01BF81, #41C3D3)' }}
              />
            </Link>
          ))}
        </nav>

        {/* CTA button */}
        <Link href="#contact" className="hidden md:inline-flex btn-primary">
          Get in Touch
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ color: scrolled ? '#3d465a' : '#fff' }}
        >
          <div className="w-6 h-[18px] flex flex-col justify-between">
            <span className={`block h-[2px] bg-current rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-[2px] bg-current rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[2px] bg-current rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => { setActive(link.label); setMenuOpen(false); }}
              className="text-[13px] font-medium text-[#3d465a] hover:text-[#01BF81] transition-colors"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="#contact" className="btn-primary justify-center text-center mt-2" onClick={() => setMenuOpen(false)}>
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
