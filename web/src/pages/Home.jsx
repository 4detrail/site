import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal, .stagger-children').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  useReveal();
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <PageLayout>
      {/* HERO */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Hex grid bg */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="w-[800px] h-[800px] opacity-[0.03] border border-white"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[500px] h-[500px] opacity-[0.05] border border-white"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          />
        </div>

        {/* Logo floating */}
        <motion.div
          style={{ x: mousePos.x, y: mousePos.y }}
          className="absolute opacity-10 select-none pointer-events-none"
        >
          <img
            src="https://media.base44.com/images/public/user_6a230f8c5a93cc46afd6904a/bfcb87864_Varlk20.png"
            alt=""
            className="w-96 h-96 object-contain invert"
          />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4">
              <span className="font-mono text-xs tracking-[0.4em] text-muted-foreground border border-border px-4 py-2 inline-block">
                OYUN STÜDYOSİ // 2026
              </span>
            </div>
            <h1
              className="glitch-text font-heading font-black leading-none mb-6"
              data-text="HEXAGES GAMES"
              style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', letterSpacing: '-0.03em' }}
            >
              HEXAGES<br />GAMES
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-muted-foreground text-lg font-body max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Yeni nesil oyun deneyimlerini keşfetmeye hazır olun. Güçlü motorumuz ve tutkulu ekibimizle oyun dünyasını yeniden şekillendiriyoruz.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/launcher"
                className="download-btn-transform px-8 py-4 bg-white text-black font-mono text-sm tracking-widest hover:bg-transparent hover:text-white border border-white transition-all duration-300"
              >
                LAUNCHER'I İNDİR
              </Link>
              <Link
                to="/oyunlar"
                className="download-btn-transform px-8 py-4 bg-transparent text-white font-mono text-sm tracking-widest border border-white/30 hover:border-white transition-all duration-300"
              >
                OYUNLARI İNCELE
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs text-muted-foreground tracking-widest">SCROLL</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* STATS */}
      <section className="py-24 px-6 border-y border-border relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="stagger-children grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {[
              { num: '1.1.9', label: 'LAUNCHER VERSİYONU' },
              { num: '3+', label: 'AKTİF PROJE' },
              { num: '2', label: 'PLATFORM' },
              { num: '∞', label: 'POTANSİYEL' },
            ].map(({ num, label }) => (
              <div key={label} className="bg-background p-8 text-center hover:bg-white/5 transition-colors group">
                <div className="font-heading font-black text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{num}</div>
                <div className="font-mono text-xs text-muted-foreground tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <span className="font-mono text-xs tracking-widest text-muted-foreground">// HAKKIMIZDA</span>
            <h2 className="font-heading font-black text-4xl md:text-6xl mt-4 mb-6 leading-none">
              GELECEĞIN<br />OYUN<br />STÜDYOSİ
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              HEXAGES GAMES olarak, geleneksel oyun sınırlarını yıkıyor ve oyuncular için unutulmaz deneyimler tasarlıyoruz. Her piksel, her ses, her mekanik — mükemmellik için tasarlandı.
            </p>
            <div className="flex gap-6">
              <a href="https://discord.gg/ETe46SWQtC" target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs tracking-widest text-muted-foreground hover:text-white border-b border-transparent hover:border-white pb-1 transition-all">
                DİSCORD →
              </a>
              <a href="https://www.instagram.com/hexagesgames" target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs tracking-widest text-muted-foreground hover:text-white border-b border-transparent hover:border-white pb-1 transition-all">
                İNSTAGRAM →
              </a>
              <a href="https://x.com/hexages_games" target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs tracking-widest text-muted-foreground hover:text-white border-b border-transparent hover:border-white pb-1 transition-all">
                X →
              </a>
            </div>
          </div>

          <div className="reveal grid grid-cols-2 gap-4">
            {['OYUN GELİŞTİRME', 'TOPLULUK', 'MOBİL', 'PC PLATFORM'].map((item, i) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.5)' }}
                className="border border-border p-6 card-3d cursor-pointer"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="font-heading font-black text-2xl mb-2 opacity-20">{String(i + 1).padStart(2, '0')}</div>
                <div className="font-mono text-xs tracking-wider">{item}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LAUNCHER CTA */}
      <section className="py-24 px-6 border-t border-border relative z-10">
        <div className="max-w-4xl mx-auto text-center reveal">
          <span className="font-mono text-xs tracking-widest text-muted-foreground">// LAUNCHER</span>
          <h2 className="font-heading font-black text-4xl md:text-6xl mt-4 mb-6 leading-none">
            TÜM OYUNLAR<br />TEK UYGULAMA
          </h2>
          <p className="text-muted-foreground mb-10 font-body">
            HEXAGES Launcher ile tüm oyunlarımıza tek bir noktadan eriş, otomatik güncellemeler al ve topluluğa katıl.
          </p>
          <Link
            to="/launcher"
            className="download-btn-transform inline-block px-12 py-5 bg-white text-black font-mono font-bold text-sm tracking-widest hover:bg-transparent hover:text-white border border-white transition-all duration-300"
          >
            ⬇ LAUNCHER'I ŞİMDİ İNDİR
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}