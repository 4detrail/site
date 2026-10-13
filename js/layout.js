// Ortak navbar & footer — tüm sayfalar bu dosyayı kullanır.
// Not: Faturalandırma (fatura.html / dekont.html) arayüzden kaldırıldı; sayfalar arka planda çalışmaya devam eder.

const NAV_ITEMS = [
  { href: 'index.html', label: 'ANA SAYFA' },
  { href: 'oyunlar.html', label: 'OYUNLAR' },
  { href: 'pluginlerimiz.html', label: 'PLUGİNLER' },
  { href: 'launcher.html', label: 'LAUNCHER' },
  { href: 'iletisim.html', label: 'İLETİŞİM' },
  { href: 'ticket.html', label: 'DESTEK' }
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
    <a href="index.html" class="nav-logo" aria-label="HEXAGES GAMES ana sayfa">
      <img class="logo-dark" src="logo-white.png" alt="HEXAGES GAMES logo" width="36" height="32"><img class="logo-light" src="logo-black.png" alt="" aria-hidden="true" width="36" height="32">
      <span>HEXAGES GAMES</span>
    </a>
    <ul class="nav-links">${desktop}</ul>
    <div class="nav-actions">
      <button class="btn-theme" id="theme-btn" type="button" aria-label="Temayı değiştir"><span id="theme-icon">☀</span></button>
      <div id="nav-auth"><a href="giris.html" class="btn-login">GİRİŞ</a></div>
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
          <a href="index.html">→ ANA SAYFA</a>
          <a href="oyunlar.html">→ OYUNLAR</a>
          <a href="pluginlerimiz.html">→ PLUGİNLER</a>
          <a href="launcher.html">→ LAUNCHER</a>
          <a href="iletisim.html">→ İLETİŞİM</a>
          <a href="ticket.html">→ DESTEK</a>
          <a href="oyun.html?id=chasing-the-shlump">→ CHASING THE SHLUMP</a>
          <a href="ayarlar.html">→ AYARLAR</a>
          <a href="privacy.html">→ GİZLİLİK POLİTİKASI</a>
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
      <p class="text-muted text-mono" style="font-size:11px"><a href="privacy.html" style="color:inherit">GİZLİLİK</a></p>
    </div>
  </div>
</footer>
`;
}
