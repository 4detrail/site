// Shared navbar & layout HTML generator
const NAV_ITEMS = [
  ['index.html', 'ANA SAYFA'],
  ['oyunlar.html', 'OYUNLAR'],
  ['devlog.html', 'DEVLOG'],
  ['pluginlerimiz.html', 'PLUGINLER'],
  ['launcher.html', 'LAUNCHER'],
  ['iletisim.html', 'İLETİŞİM'],
  ['ticket.html', 'TİCKET']
];

export function getNavHTML() {
  const desktop = NAV_ITEMS.map(([href, label]) =>
    `<li><a href="${href}" class="nav-link">${label}</a></li>`).join('\n      ');
  const mobile = NAV_ITEMS.map(([href, label]) =>
    `<a href="${href}" class="nav-link">${label}</a>`).join('\n    ');

  return `
<nav id="main-nav" aria-label="Ana menü">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo" aria-label="HEXAGES GAMES ana sayfa">
      <img src="logom1.png" alt="HEXAGES GAMES logo" width="36" height="36">
      <span>HEXAGES GAMES</span>
    </a>
    <ul class="nav-links">
      ${desktop}
    </ul>
    <div class="nav-actions">
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
  return `
<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">
          <img src="logom1.png" alt="HEXAGES GAMES logo" width="36" height="36" loading="lazy">
          <span>HEXAGES GAMES</span>
        </div>
        <p style="font-size:13px;line-height:1.7;max-width:30ch">Yeni nesil oyun deneyimleri. Her piksel, her mekanik — mükemmellik için tasarlandı.</p>
      </div>
      <div>
        <p class="footer-heading">NAVİGASYON</p>
        <div class="footer-links">
          <a href="index.html">Ana Sayfa</a>
          <a href="oyunlar.html">Oyunlar</a>
          <a href="devlog.html">Devlog</a>
          <a href="pluginlerimiz.html">Pluginler</a>
          <a href="launcher.html">Launcher</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">DESTEK</p>
        <div class="footer-links">
          <a href="iletisim.html">İletişim</a>
          <a href="ticket.html">Ticket</a>
          <a href="privacy.html">Gizlilik Politikası</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">SOSYAL MEDYA</p>
        <div class="footer-links">
          <a href="https://discord.gg/ETe46SWQtC" target="_blank" rel="noopener">Discord</a>
          <a href="https://www.instagram.com/hexagesgames" target="_blank" rel="noopener">Instagram</a>
          <a href="https://x.com/hexages_games" target="_blank" rel="noopener">X (Twitter)</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p style="font-size:11px;letter-spacing:.12em;color:var(--dim)">© 2026 HEXAGES GAMES. TÜM HAKLARI SAKLIDIR.</p>
      <p style="font-size:11px;letter-spacing:.12em;color:var(--dim)">VERSION 1.1.9 // KINETIC VOID</p>
    </div>
  </div>
</footer>
`;
}
