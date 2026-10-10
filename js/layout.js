// Ortak üst menü ve footer
const LINKS = [
  ['index.html', 'Ana Sayfa'],
  ['oyunlar.html', 'Oyunlar'],
  ['devlog.html', 'Dev Log'],
  ['launcher.html', 'Launcher'],
  ['pluginlerimiz.html', 'Pluginler'],
  ['iletisim.html', 'İletişim'],
  ['ticket.html', 'Destek']
];

export function getNavHTML() {
  const desktop = LINKS.map(([href, label]) => `<li><a href="${href}" class="nav-link">${label}</a></li>`).join('');
  const mobile = LINKS.map(([href, label]) => `<a href="${href}" class="nav-link">${label}</a>`).join('');
  return `
<a href="#main" class="skip-link">İçeriğe geç</a>
<nav id="main-nav" aria-label="Ana menü">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo" aria-label="HEXAGES GAMES ana sayfa">
      <img src="logom1.png" alt="" width="28" height="28">
      <span>HEXAGES GAMES</span>
    </a>
    <ul class="nav-links">${desktop}</ul>
    <div class="nav-actions">
      <div id="nav-auth"><a href="giris.html" class="btn-login">GİRİŞ YAP</a></div>
      <button class="btn-hamburger" id="hamburger" type="button" aria-label="Menüyü aç" aria-expanded="false" aria-controls="mobile-menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </div>
</nav>
<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
  <div class="mobile-menu-list">
    ${mobile}
    <div id="mobile-auth" class="mobile-menu-auth"></div>
  </div>
</div>
`;
}

export function getFooterHTML() {
  return `
<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">
          <img src="logom1.png" alt="" width="28" height="28">
          <span>HEXAGES GAMES</span>
        </div>
        <p>Bağımsız oyun stüdyosu. Chasing the Shlump geliştirme aşamasında.</p>
      </div>
      <div>
        <p class="footer-heading">Keşfet</p>
        <div class="footer-links">
          <a href="oyunlar.html">Oyunlar</a>
          <a href="devlog.html">Dev Log</a>
          <a href="launcher.html">Aperon Launcher</a>
          <a href="pluginlerimiz.html">Pluginler</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">Destek</p>
        <div class="footer-links">
          <a href="iletisim.html">İletişim</a>
          <a href="ticket.html">Destek talebi</a>
          <a href="privacy.html">Gizlilik</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">Topluluk</p>
        <div class="footer-links">
          <a href="https://discord.gg/ETe46SWQtC" target="_blank" rel="noopener">Discord</a>
          <a href="https://www.instagram.com/hexagesgames" target="_blank" rel="noopener">Instagram</a>
          <a href="https://x.com/hexages_games" target="_blank" rel="noopener">X</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 HEXAGES GAMES. Tüm hakları saklıdır.</p>
      <p>hexagesgames.vercel.app</p>
    </div>
  </div>
</footer>
`;
}
