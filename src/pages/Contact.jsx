import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Send } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

export default function Contact() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal, .stagger-children').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const socials = [
    { label: 'Discord', href: 'https://discord.gg/ETe46SWQtC', desc: 'Topluluğa katıl, oyuncularla konuş.' },
    { label: 'Instagram', href: 'https://www.instagram.com/hexagesgames', desc: 'Son haberler ve görseller.' },
    { label: 'X (Twitter)', href: 'https://x.com/hexages_games', desc: 'Anlık duyurular ve güncellemeler.' },
  ];

  return (
    <PageLayout>
      <section className="min-h-screen pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <span className="font-mono text-xs tracking-widest text-muted-foreground">// İLETİŞİM</span>
            <h1 className="font-heading font-black text-5xl md:text-8xl mt-2 leading-none">İLETİŞİM</h1>
            <p className="text-muted-foreground mt-4 font-mono text-sm">
              Bizimle iletişime geçin veya destek için ticket oluşturun.
            </p>
          </motion.div>

          <div className="stagger-children grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Social Media */}
            <div className="border border-border p-8 hover:border-white/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare size={20} className="text-white" />
                <h2 className="font-mono text-sm tracking-widest">SOSYAL MEDYA</h2>
              </div>
              <div className="flex flex-col gap-4">
                {socials.map(({ label, href, desc }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group p-4 border border-transparent hover:border-white/10 transition-all"
                  >
                    <ChevronRightIcon />
                    <div>
                      <p className="font-mono text-sm group-hover:text-white transition-colors">{label}</p>
                      <p className="font-mono text-xs text-muted-foreground mt-1">{desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Support Ticket */}
            <div className="border border-border p-8 hover:border-white/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <Send size={20} className="text-white" />
                <h2 className="font-mono text-sm tracking-widest">DESTEK TİCKET</h2>
              </div>
              <p className="text-muted-foreground font-mono text-xs leading-relaxed mb-8">
                Teknik destek, öneriler veya geri bildirimleriniz için ticket sistemi üzerinden bize ulaşabilirsiniz. Admin ekibimiz en kısa sürede size dönüş yapacaktır.
              </p>
              <Link
                to="/ticket"
                className="download-btn-transform block text-center py-4 px-6 border border-white text-xs font-mono tracking-widest bg-white text-black hover:bg-transparent hover:text-white transition-all duration-300"
              >
                TİCKET OLUŞTUR
              </Link>
            </div>

            {/* Email */}
            <div className="border border-border p-8 hover:border-white/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <Mail size={20} className="text-white" />
                <h2 className="font-mono text-sm tracking-widest">E-POSTA</h2>
              </div>
              <a
                href="mailto:destek@hexagesgames.com"
                className="font-mono text-sm text-muted-foreground hover:text-white transition-colors"
              >
                destek@hexagesgames.com
              </a>
            </div>

            {/* Response time */}
            <div className="border border-border p-8 bg-white/[0.02]">
              <h2 className="font-mono text-xs tracking-widest text-muted-foreground mb-4">// YANIT SÜRESİ</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">Teknik Destek</span>
                  <span className="font-mono text-xs">24-48 saat</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">Genel Sorular</span>
                  <span className="font-mono text-xs">1-3 gün</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">Discord</span>
                  <span className="font-mono text-xs text-green-400">Anlık</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function ChevronRightIcon() {
  return <span className="text-white mt-0.5 text-xs">→</span>;
}