export function getNavHTML() {
  return `
<canvas id="starfield"></canvas>
<div class="grid-overlay"></div>
<div class="scanline"></div>
<div id="cursor-glow"></div>
<nav id="main-nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <img src="logo.png" alt="Hexages Games">
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
