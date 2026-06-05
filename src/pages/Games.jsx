import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';

const projects = [
  { id: 1, label: 'Proje #1' },
  { id: 2, label: 'Proje #2' },
  { id: 3, label: 'Proje #3' },
  { id: 4, label: 'Proje #4' },
  { id: 5, label: 'Proje #5' },
  { id: 6, label: 'Proje #6' },
];

export default function Games() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal, .stagger-children').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <PageLayout>
      <section className="min-h-screen pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <span className="font-mono text-xs tracking-widest text-muted-foreground">// OYUNLAR</span>
            <h1 className="font-heading font-black text-5xl md:text-8xl mt-2 leading-none">OYUNLARIMIZ</h1>
            <p className="text-muted-foreground mt-4 font-mono text-sm">Şu anda projeler üstünde çalışılıyor</p>
          </motion.div>

          {/* Glitch Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative border border-border p-6 mb-16 overflow-hidden"
          >
            <div className="absolute inset-0 shimmer" />
            <div className="relative flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scaleY: [1, 2, 1, 0.5, 1] }}
                    transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 2 }}
                    className="w-1 h-4 bg-white opacity-60"
                  />
                ))}
              </div>
              <p
                className="glitch-text font-mono text-xs md:text-sm tracking-[0.2em] text-muted-foreground"
                data-text="SİSTEM ŞU ANDA PROJELER ÜSTÜNDE ÇALIŞIYOR — VERİ YÜKLENİYOR..."
              >
                SİSTEM ŞU ANDA PROJELER ÜSTÜNDE ÇALIŞIYOR — VERİ YÜKLENİYOR...
              </p>
            </div>
          </motion.div>

          {/* Game Cards Grid */}
          <div className="stagger-children grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.3)' }}
                className="relative border border-border overflow-hidden cursor-pointer card-3d group"
                style={{ aspectRatio: '4/3' }}
              >
                {/* Dark bg with noise */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />

                {/* Shimmer overlay */}
                <div className="absolute inset-0 shimmer opacity-50" />

                {/* Animated scan lines */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)'
                  }}
                />

                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/30" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-white/30" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-white/30" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/30" />

                {/* Loading dots */}
                <div className="absolute top-4 right-4 flex gap-1">
                  {[0, 1, 2].map(j => (
                    <motion.div
                      key={j}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, delay: j * 0.3, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-white"
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <p className="font-heading font-black text-xl tracking-widest mb-2">COMING SOON</p>
                    <p className="font-mono text-xs text-muted-foreground tracking-widest text-center">{project.label}</p>
                  </motion.div>
                </div>

                {/* Hover reveal */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Status bar */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-3 bg-black/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">STATUS</span>
                    <span className="font-mono text-xs text-white flex items-center gap-2">
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block"
                      />
                      GELİŞTİRİLİYOR
                    </span>
                  </div>
                  <div className="mt-2 h-0.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${20 + i * 10}%` }}
                      transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
                      className="h-full bg-white/40"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center border border-border p-12 relative overflow-hidden reveal"
          >
            <div className="absolute inset-0 shimmer" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground">// GÜNCELLEMELERİ TAKİP ET</span>
            <h2 className="font-heading font-black text-3xl mt-4 mb-4">HABERDAR OL</h2>
            <p className="text-muted-foreground font-mono text-sm mb-8">
              Oyunlar yayına girdiğinde ilk sen öğren. Discord'a katıl!
            </p>
            <a
              href="https://discord.gg/ETe46SWQtC"
              target="_blank"
              rel="noopener noreferrer"
              className="download-btn-transform inline-block px-8 py-4 bg-white text-black font-mono text-xs tracking-widest hover:bg-transparent hover:text-white border border-white transition-all duration-300"
            >
              DİSCORD'A KATIL →
            </a>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}