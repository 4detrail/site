import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import StarField from './StarField';
import CursorGlow from './CursorGlow';

export default function PageLayout({ children, noFooter = false }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <StarField />
      <div className="grid-overlay" />
      <div className="scanline" />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
      {!noFooter && <Footer />}
    </div>
  );
}