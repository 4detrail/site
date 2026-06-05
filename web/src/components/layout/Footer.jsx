import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://media.base44.com/images/public/6a230fb4447836a5b131d0c7/03b7964ff_Varlk20.png"
                            alt="Hexages"
                            className="h-8"
              />
              <span className="font-heading font-black text-sm tracking-widest">HEXAGES GAMES</span>
            </div>
            <p className="text-muted-foreground text-sm font-mono leading-relaxed">
              Yeni nesil oyun deneyimleri.<br />
              Geleceği şekillendiriyoruz.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-widest text-muted-foreground mb-6">NAVİGASYON</h3>
            <div className="flex flex-col gap-3">
              {[['/', 'ANA SAYFA'], ['/oyunlar', 'OYUNLAR'], ['/launcher', 'LAUNCHER'], ['/iletisim', 'İLETİŞİM']].map(([to, label]) => (
                <Link key={to} to={to} className="text-sm font-mono text-muted-foreground hover:text-white transition-colors">
                  → {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-widest text-muted-foreground mb-6">SOSYAL MEDYA</h3>
            <div className="flex flex-col gap-3">
              <a href="https://discord.gg/ETe46SWQtC" target="_blank" rel="noopener noreferrer"
                className="text-sm font-mono text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
                <span className="text-white">◆</span> Discord
              </a>
              <a href="https://www.instagram.com/hexagesgames" target="_blank" rel="noopener noreferrer"
                className="text-sm font-mono text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
                <span className="text-white">◆</span> Instagram
              </a>
              <a href="https://x.com/hexages_games" target="_blank" rel="noopener noreferrer"
                className="text-sm font-mono text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
                <span className="text-white">◆</span> X (Twitter)
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 HEXAGES GAMES. TÜM HAKLARI SAKLIDIR.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            VERSION 1.1.9 // KINETIC VOID
          </p>
        </div>
      </div>
    </footer>
  );
}