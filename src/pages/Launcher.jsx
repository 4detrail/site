import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone, Download, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

function DownloadButton({ href, label, icon: Icon, color = 'white' }) {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (downloading || done) return;
    setDownloading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        setProgress(p);
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setDownloading(false);
          window.open(href, '_blank');
        }, 500);
      } else {
        setProgress(p);
      }
    }, 100);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative w-full py-5 px-6 border overflow-hidden font-mono text-sm tracking-widest transition-all duration-300 ${
        color === 'blue'
          ? 'border-blue-400/50 text-blue-300 hover:border-blue-400'
          : 'border-white text-black bg-white hover:bg-transparent hover:text-white'
      }`}
    >
      <AnimatePresence mode="wait">
        {downloading ? (
          <motion.div
            key="progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="absolute inset-0 bg-white/20"
              style={{ width: `${progress}%`, transition: 'width 0.1s ease' }}
            />
            <span className="relative z-10 font-mono text-xs">
              {Math.round(progress)}% — HAZIRLANIYOR...
            </span>
          </motion.div>
        ) : done ? (
          <motion.span
            key="done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2"
          >
            ✓ İNDİRME BAŞLADI
          </motion.span>
        ) : (
          <motion.span
            key="label"
            className="flex items-center justify-center gap-2"
          >
            <Icon size={16} /> {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

const SpecItem = ({ label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
    <span className="font-mono text-xs text-muted-foreground">{label}</span>
    <span className="font-mono text-xs text-white">{value}</span>
  </div>
);

export default function Launcher() {
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
            className="text-center mb-20"
          >
            <span className="font-mono text-xs tracking-widest text-muted-foreground">// İNDİR</span>
            <h1 className="font-heading font-black mt-2 leading-none" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
              LAUNCHER İNDİR
            </h1>
            <p className="text-muted-foreground mt-4 font-mono text-sm max-w-lg mx-auto">
              Tüm HEXAGES oyunlarına tek noktadan erişin. Platform seçin ve indirin.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* PC Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border border-border p-8 relative overflow-hidden card-3d"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <div className="flex items-center gap-3 mb-6">
                <Monitor size={24} className="text-white" />
                <h2 className="font-heading font-black text-2xl">PC VERSİYONU</h2>
              </div>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8">
                Tüm HEXAGES oyunlarına tek bir noktadan erişin. Otomatik güncellemeler, topluluk özellikleri ve daha fazlası.
              </p>
              <DownloadButton
                href="https://github.com/4detrail/hexagesgames-release/releases/download/v1.1.9/Hexagesgames_Setup_1.1.9.exe"
                label="LAUNCHER'I ŞİMDİ İNDİR"
                icon={Download}
              />
              <p className="font-mono text-xs text-muted-foreground mt-4 text-center">
                Sürüm: 1.1.9 | Boyut: ~118 MB | Platform: Windows 10/11
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="border border-white/10 p-5">
                  <h3 className="font-mono text-xs tracking-widest mb-4 text-muted-foreground">MİNİMUM</h3>
                  <SpecItem label="İşletim Sistemi" value="Windows 10 64-bit" />
                  <SpecItem label="İşlemci" value="Intel i3 / Ryzen 3" />
                  <SpecItem label="Bellek" value="4 GB RAM" />
                  <SpecItem label="Ekran Kartı" value="Intel HD 620" />
                  <SpecItem label="Depolama" value="500 MB" />
                </div>
                <div className="border border-emerald-500/20 p-5">
                  <h3 className="font-mono text-xs tracking-widest mb-4 text-emerald-400">ÖNERİLEN</h3>
                  <SpecItem label="İşletim Sistemi" value="Windows 11 64-bit" />
                  <SpecItem label="İşlemci" value="Intel i5 / Ryzen 5" />
                  <SpecItem label="Bellek" value="8 GB RAM" />
                  <SpecItem label="Ekran Kartı" value="GTX 1050 Ti" />
                  <SpecItem label="Bağlantı" value="Geniş Bant" />
                </div>
              </div>
            </motion.div>

            {/* Mobile Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="border border-blue-500/20 p-8 relative overflow-hidden card-3d"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <div className="flex items-center gap-3 mb-6">
                <Smartphone size={24} className="text-blue-400" />
                <h2 className="font-heading font-black text-2xl text-blue-300">MOBİL DEMO</h2>
              </div>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8">
                HEXAGES oyunlarını mobil cihazınızda deneyin. Beta versiyonlarını telefonunuzda test edin ve geri bildirim gönderin.
              </p>
              <DownloadButton
                href="https://github.com/4detrail/hexagesgames-release/releases/download/V1.0.2/hexages-mobile.apk"
                label="MOBİL DEMOYU AÇ"
                icon={Smartphone}
                color="blue"
              />
              <p className="font-mono text-xs text-muted-foreground mt-4 text-center">
                Sürüm: DEMO - 1.0.2 | Çevrimiçi Demo | Android/iOS Uyumlu
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="border border-blue-500/10 p-5">
                  <h3 className="font-mono text-xs tracking-widest mb-4 text-blue-400/70">MOBİL GEREKSİNİMLER</h3>
                  <SpecItem label="İşletim Sistemi" value="Android 8+ / iOS 12+" />
                  <SpecItem label="İşlemci" value="2+ Çekirdekli" />
                  <SpecItem label="Bellek" value="2 GB RAM" />
                  <SpecItem label="Depolama" value="100 MB" />
                  <SpecItem label="Bağlantı" value="Geniş Bant" />
                </div>
                <div className="border border-blue-500/10 p-5">
                  <h3 className="font-mono text-xs tracking-widest mb-4 text-blue-400/70">DEMO ÖZELLİKLERİ</h3>
                  <SpecItem label="Çevrimiçi Erişim" value="Evet" />
                  <SpecItem label="Beta Oyunlar" value="3 Oyun" />
                  <SpecItem label="Kontrol" value="Dokunmatik/Gamepad" />
                  <SpecItem label="Cloud Kayıt" value="Evet" />
                  <SpecItem label="Geri Bildirim" value="Entegre" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ */}
          <div className="mt-20 reveal">
            <h2 className="font-heading font-black text-2xl mb-8 text-center">SIK SORULAN SORULAR</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { q: 'Launcher güvenli mi?', a: 'Evet, tüm dosyalarımız GitHub üzerinden imzalı olarak yayınlanmaktadır.' },
                { q: 'Mobil demo ücretsiz mi?', a: 'Evet, demo sürümü tamamen ücretsizdir. Beta test için erken erişim.' },
                { q: 'Hangi Windows sürümleri destekleniyor?', a: 'Windows 10 ve Windows 11 64-bit desteklenmektedir.' },
                { q: 'Launcher otomatik güncelleniyor mu?', a: 'Evet, yeni sürüm çıktığında launcher otomatik olarak güncelleme bildirir.' },
              ].map(({ q, a }) => (
                <div key={q} className="border border-border p-6 hover:border-white/30 transition-colors">
                  <h3 className="font-mono text-sm font-bold mb-2">Q: {q}</h3>
                  <p className="text-muted-foreground font-mono text-xs leading-relaxed">A: {a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}