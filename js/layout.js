// Shared navbar & layout HTML generator
export function getNavHTML() {
  return `
<canvas id="starfield"></canvas>
<div class="grid-overlay"></div>
<div class="scanline"></div>
<div id="cursor-glow"></div>

<nav id="main-nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <img src="https://media.base44.com/images/public/6a230fb4447836a5b131d0c7/03b7964ff_Varlk20.png" alt="Hexages Games">
      <span>HEXAGES GAMES</span>
    </a>
    <ul class="nav-links">
      <li><a href="index.html" class="nav-link">ANA SAYFA</a></li>
      <li><a href="oyunlar.html" class="nav-link">OYUNLAR</a></li>
      <li><a href="launcher.html" class="nav-link">LAUNCHER</a></li>
      <li><a href="iletisim.html" class="nav-link">İLETİŞİM</a></li>
      <li><a href="ticket.html" class="nav-link">TİCKET</a></li>
    </ul>
    <div class="nav-actions">
      <button class="btn-theme" id="theme-btn" aria-label="Tema değiştir"><span id="theme-icon">☀</span></button>
      <div id="nav-auth"><a href="giris.html" class="btn-login">GİRİŞ</a></div>
      <button class="btn-hamburger" id="hamburger" type="button" aria-label="Menüyü aç" aria-expanded="false" aria-controls="mobile-menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
    <a href="index.html" class="nav-link">→ ANA SAYFA</a>
    <a href="oyunlar.html" class="nav-link">→ OYUNLAR</a>
    <a href="launcher.html" class="nav-link">→ LAUNCHER</a>
    <a href="iletisim.html" class="nav-link">→ İLETİŞİM</a>
    <a href="ticket.html" class="nav-link">→ TİCKET</a>
    <div id="mobile-auth" class="mobile-menu-auth"></div>
  </div>
</nav>
`;
}

export function getFooterHTML() {
  return `
<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">
          <img src="https://media.base44.com/images/public/6a230fb4447836a5b131d0c7/03b7964ff_Varlk20.png" alt="Hexages">
          <span>HEXAGES GAMES</span>
        </div>
        <p class="text-muted text-mono" style="font-size:13px;line-height:1.7">Yeni nesil oyun deneyimleri.<br>Geleceği şekillendiriyoruz.</p>
      </div>
      <div>
        <p class="footer-heading">NAVİGASYON</p>
        <div class="footer-links">
          <a href="index.html">→ ANA SAYFA</a>
          <a href="oyunlar.html">→ OYUNLAR</a>
          <a href="launcher.html">→ LAUNCHER</a>
          <a href="iletisim.html">→ İLETİŞİM</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">SOSYAL MEDYA</p>
        <div class="footer-links">
          <a href="https://discord.gg/ETe46SWQtC" target="_blank">◆ Discord</a>
          <a href="https://www.instagram.com/hexagesgames" target="_blank">◆ Instagram</a>
          <a href="https://x.com/hexages_games" target="_blank">◆ X (Twitter)</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="text-muted text-mono" style="font-size:11px">© 2026 HEXAGES GAMES. TÜM HAKLARI SAKLIDIR.</p>
      <p class="text-muted text-mono" style="font-size:11px">VERSION 1.1.9 // KINETIC VOID</p>
    </div>
  </div>
</footer>
`;
}
