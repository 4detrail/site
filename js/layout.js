// Ortak navbar & footer (tüm sayfalar bu dosyayı kullanır)
export function getNavHTML() {
  return `
<nav id="main-nav" aria-label="Ana menü">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo" aria-label="HEXAGES GAMES ana sayfa">
      <img src="logo-hx.png" alt="HEXAGES GAMES logosu" width="38" height="38">
      <span>HEXAGES <b>GAMES</b></span>
    </a>
    <ul class="nav-links">
      <li><a href="index.html" class="nav-link">Ana Sayfa</a></li>
      <li><a href="oyunlar.html" class="nav-link">Oyunlar</a></li>
      <li><a href="pluginlerimiz.html" class="nav-link">Pluginler</a></li>
      <li><a href="launcher.html" class="nav-link">Launcher</a></li>
      <li><a href="iletisim.html" class="nav-link">İletişim</a></li>
      <li><a href="ticket.html" class="nav-link">Ticket</a></li>
    </ul>
    <div class="nav-actions">
      <a href="launcher.html" class="nav-cta">Launcher İndir</a>
      <div id="nav-auth"><a href="giris.html" class="btn-login">Giriş</a></div>
      <button class="btn-hamburger" id="hamburger" type="button" aria-label="Menüyü aç" aria-controls="mobile-menu" aria-expanded="false"><span class="hamburger-line"></span><span class="hamburger-line"></span><span class="hamburger-line"></span></button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu">
    <a href="index.html" class="nav-link">Ana Sayfa</a>
    <a href="oyunlar.html" class="nav-link">Oyunlar</a>
    <a href="pluginlerimiz.html" class="nav-link">Pluginler</a>
    <a href="launcher.html" class="nav-link">Launcher</a>
    <a href="iletisim.html" class="nav-link">İletişim</a>
    <a href="ticket.html" class="nav-link">Ticket</a>
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
          <img src="logo-hx.png" alt="HEXAGES GAMES logosu" width="40" height="40" loading="lazy">
          <span>HEXAGES GAMES</span>
        </div>
        <p class="footer-about">Bağımsız oyun stüdyosu. Oyunlar, araçlar ve topluluk için yeni nesil deneyimler geliştiriyoruz.</p>
      </div>
      <div>
        <p class="footer-heading">Keşfet</p>
        <div class="footer-links">
          <a href="oyunlar.html">Oyunlar</a>
          <a href="chasing-the-shlump.html">Chasing the Shlump</a>
          <a href="launcher.html">Aperon Launcher</a>
          <a href="pluginlerimiz.html">Pluginler</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">Destek</p>
        <div class="footer-links">
          <a href="iletisim.html">İletişim</a>
          <a href="ticket.html">Destek Ticket</a>
          <a href="privacy.html">Gizlilik Politikası</a>
          <a href="giris.html">Hesap / Giriş</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">Topluluk</p>
        <div class="footer-links">
          <a href="https://discord.gg/ETe46SWQtC" target="_blank" rel="noopener">Discord</a>
          <a href="https://www.instagram.com/hexagesgames" target="_blank" rel="noopener">Instagram</a>
          <a href="https://x.com/hexages_games" target="_blank" rel="noopener">X (Twitter)</a>
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
