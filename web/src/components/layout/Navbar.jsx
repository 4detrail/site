import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: 'ANA SAYFA' },
    { to: '/oyunlar', label: 'OYUNLAR' },
    { to: '/launcher', label: 'LAUNCHER' },
    { to: '/iletisim', label: 'İLETİŞİM' },
    { to: '/ticket', label: 'TİCKET' },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.img
            src="https://media.base44.com/images/public/6a230fb4447836a5b131d0c7/03b7964ff_Varlk20.png"
            alt="Hexages Games"
            className="h-8 w-auto"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <span className="font-heading font-black text-sm tracking-widest text-foreground group-hover:text-white transition-colors">
            HEXAGES GAMES
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-mono text-xs tracking-widest transition-all duration-300 hover:text-white relative group ${
                location.pathname === link.to ? 'text-white' : 'text-muted-foreground'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300 ${
                location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 border border-border hover:border-white/50 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={14} className="text-muted-foreground hover:text-white" /> : <Moon size={14} />}
          </button>

          {user ? (
            <Link
              to="/profil"
              className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-white text-xs font-mono tracking-widest transition-all duration-300 hover:bg-white hover:text-black"
            >
              <User size={12} />
              {user.displayName?.split(' ')[0]?.toUpperCase() || 'PROFİL'}
            </Link>
          ) : (
            <Link
              to="/giris"
              className="px-4 py-2 border border-white text-xs font-mono tracking-widest bg-white text-black hover:bg-transparent hover:text-white transition-all duration-300"
            >
              GİRİŞ
            </Link>
          )}

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/98 backdrop-blur-md"
          >
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-6 py-4 font-mono text-xs tracking-widest border-b border-border/30 transition-colors ${
                  location.pathname === link.to ? 'text-white bg-white/5' : 'text-muted-foreground hover:text-white'
                }`}
              >
                → {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}