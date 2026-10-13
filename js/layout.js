// Ortak navbar & footer — tüm sayfalar bu dosyayı kullanır.
// Not: Faturalandırma (fatura / dekont) arayüzden kaldırıldı; sayfalar arka planda çalışmaya devam eder.

const NAV_ITEMS = [
  { href: '/', label: 'ANA SAYFA' },
  { href: 'oyunlar', label: 'OYUNLAR' },
  { href: 'hakkimizda', label: 'HAKKIMIZDA' },
  { href: 'launcher', label: 'LAUNCHER' },
  { href: 'iletisim', label: 'İLETİŞİM' },
  { href: 'ticket', label: 'DESTEK' }
];

export function getNavHTML() {
  const desktop = NAV_ITEMS.map(i => `<li><a href="${i.href}" class="nav-link">${i.label}</a></li>`).join('');
  const mobile = NAV_ITEMS.map(i => `<a href="${i.href}" class="nav-link">→ ${i.label}</a>`).join('');
  return `
<canvas id="starfield"></canvas>
<div class="grid-overlay"></div>
<div class="scanline"></div>
<div id="cursor-glow"></div>

<nav id="main-nav">
  <div class="nav-inner">
    <a href="/" class="nav-logo" aria-label="HEXAGES GAMES ana sayfa">
      <img class="logo-dark" src="logo-white.png" alt="HEXAGES GAMES logo" width="36" height="32"><img class="logo-light" src="logo-black.png" alt="" aria-hidden="true" width="36" height="32">
      <span>HEXAGES GAMES</span>
    </a>
    <ul class="nav-links">${desktop}</ul>
    <div class="nav-actions">
      <button class="btn-theme" id="theme-btn" type="button" aria-label="Temayı değiştir"><span id="theme-icon">☀</span></button>
      <div id="nav-auth"><a href="giris" class="btn-login">GİRİŞ</a></div>
      <button class="btn-hamburger" id="hamburger" type="button" aria-label="Menüyü aç" aria-expanded="false" aria-controls="mobile-menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
    ${mobile}
    <div id="mobile-auth" class="mobile-menu-auth"></div>
  </div>
</nav>
`;
}

export function getFooterHTML() {
  const year = new Date().getFullYear();
  return `
<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">
          <img class="logo-dark" src="logo-white.png" alt="HEXAGES GAMES logo" width="36" height="32"><img class="logo-light" src="logo-black.png" alt="" aria-hidden="true" width="36" height="32">
          <span>HEXAGES GAMES</span>
        </div>
        <p class="text-muted text-mono" style="font-size:13px;line-height:1.7">Oyun stüdyosu.<br>Oyunlarımızı sizinle birlikte şekillendiriyoruz.</p>
      </div>
      <div>
        <p class="footer-heading">NAVİGASYON</p>
        <div class="footer-links">
          <a href="/">→ ANA SAYFA</a>
          <a href="oyunlar">→ OYUNLAR</a>
          <a href="hakkimizda">→ HAKKIMIZDA</a>
          <a href="launcher">→ LAUNCHER</a>
          <a href="iletisim">→ İLETİŞİM</a>
          <a href="ticket">→ DESTEK</a>
          <a href="oyun?id=chasing-the-shlump">→ CHASING THE SHLUMP</a>
          <a href="ayarlar">→ AYARLAR</a>
          <a href="privacy">→ GİZLİLİK POLİTİKASI</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">TOPLULUK</p>
        <div class="footer-links">
          <a href="https://discord.gg/ETe46SWQtC" target="_blank" rel="noopener">◆ Discord</a>
          <a href="https://www.instagram.com/hexagesgames" target="_blank" rel="noopener">◆ Instagram</a>
          <a href="https://x.com/hexages_games" target="_blank" rel="noopener">◆ X (Twitter)</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="text-muted text-mono" style="font-size:11px">© ${year} HEXAGES GAMES. TÜM HAKLARI SAKLIDIR.</p>
      <p class="text-muted text-mono" style="font-size:11px"><a href="privacy" style="color:inherit">GİZLİLİK</a></p>
    </div>
  </div>
</footer>
`;
}
