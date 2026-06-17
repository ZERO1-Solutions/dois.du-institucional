'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-green-primary">
          dois.du
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-black-primary hover:text-green-primary font-medium transition-colors">
            Início
          </Link>
          <Link href="/sobre" className="text-black-primary hover:text-green-primary font-medium transition-colors">
            Sobre
          </Link>
          <Link href="/portfolio" className="text-black-primary hover:text-green-primary font-medium transition-colors">
            Portfólio
          </Link>
          <Link href="/contato" className="text-black-primary hover:text-green-primary font-medium transition-colors">
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
