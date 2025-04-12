"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 font-mono ${
        scrolled 
          ? 'bg-surface/95 backdrop-blur-lg shadow-lg' 
          : 'bg-surface/98'
      } border-b-4 border-primary relative`}
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-90"></div>
      
      <div className="container mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center group"
          >
            <div className="relative">
              <span className="text-3xl font-display font-bold text-heading relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
              Rezoom<span className="text-primary relative">
                  4Zoom
                  <span className="absolute -bottom-1 left-0 right-0 h-2.5 bg-primary/20 -rotate-1 group-hover:rotate-0 transition-transform duration-300"></span>
                </span>
              </span>
              <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-primary/10 rounded-full transform -rotate-12 transition-all group-hover:rotate-0 group-hover:scale-110 duration-500"></div>
            </div>
          </Link>
          
          <nav className="hidden md:flex gap-8 items-center">
            {['Home', 'Services', 'About'].map((item, index) => (
              <Link 
                key={item} 
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="relative group"
              >
                <span className={`text-lg font-medium transition-all duration-300 ${
                  index === 0 ? 'text-primary font-bold' : 'text-heading hover:text-primary'
                }`}>
                  {item}
                </span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full ${
                  index === 0 ? 'w-full' : 'w-0'
                }`}></span>
                <span className="absolute -inset-2 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            ))}
          </nav>
          
          <button 
            className="md:hidden flex items-center p-2.5 rounded-lg border-2 border-primary/50 group hover:border-primary/70 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="w-7 h-7 text-primary group-hover:text-accent transition-all duration-300 group-hover:rotate-90" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pt-6 pb-4 border-t-2 border-primary/20 mt-4 animate-slide-down">
            <nav className="flex flex-col gap-4">
              {['Home', 'Services', 'About'].map((item, index) => (
                <Link 
                  key={item} 
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-lg text-heading hover:text-primary py-3 px-4 hover:bg-primary/5 rounded-lg transition-all duration-300 font-medium flex items-center group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-3 transform group-hover:translate-x-1 transition-transform duration-300">
                    {index === 0 ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    ) : index === 1 ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </span>
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes slide-down {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .shadow-retro {
          box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </header>
  );
}