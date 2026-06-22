'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2 md:py-3 bg-green-primary/95 backdrop-blur-md shadow-sm' 
          : 'py-4 md:py-6 bg-green-primary'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img 
            src="/images/Site/logo-doisdu.png" 
            alt="dois.du" 
            className="h-10 md:h-12 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6 md:gap-8">
          <Link href="/" className="text-white hover:text-orange-accent font-medium transition-colors text-sm md:text-base">
            Início
          </Link>
          <Link href="/sobre" className="text-white hover:text-orange-accent font-medium transition-colors text-sm md:text-base">
            Sobre
          </Link>
          <Link href="/portfolio" className="text-white hover:text-orange-accent font-medium transition-colors text-sm md:text-base">
            Portfólio
          </Link>
          <Link href="/contato" className="text-white hover:text-orange-accent font-medium transition-colors text-sm md:text-base">
            Contato
          </Link>
        </nav>
        <button 
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          <span className={`w-6 h-0.5 transition-all bg-white ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 transition-all bg-white ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 transition-all bg-white ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-green-primary border-t border-green-secondary">
          <nav className="container mx-auto px-4 md:px-6 py-4 flex flex-col gap-3">
            <Link href="/" onClick={closeMenu} className="text-white hover:text-orange-accent font-medium transition-colors py-2">
              Início
            </Link>
            <Link href="/sobre" onClick={closeMenu} className="text-white hover:text-orange-accent font-medium transition-colors py-2">
              Sobre
            </Link>
            <Link href="/portfolio" onClick={closeMenu} className="text-white hover:text-orange-accent font-medium transition-colors py-2">
              Portfólio
            </Link>
            <Link href="/contato" onClick={closeMenu} className="text-white hover:text-orange-accent font-medium transition-colors py-2">
              Contato
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
