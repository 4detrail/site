// Ortak navbar & footer — tüm sayfalar bu dosyayı kullanır.
// Not: Faturalandırma (fatura.html / dekont.html) arayüzden kaldırıldı; sayfalar arka planda çalışmaya devam eder.
// Pluginler artık launcher sayfasının altında (launcher.html#pluginler).

const NAV_ITEMS = [
  { href: 'index.html', label: 'ANA SAYFA' },
  { href: 'oyunlar.html', label: 'OYUNLAR' },
  { href: 'launcher.html', label: 'LAUNCHER' },
  { href: 'hakkimizda.html', label: 'HAKKIMIZDA' },
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
<div class="scroll-progress" id="scroll-progress" aria-hidden="true"></div>

<nav id="main-nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo" aria-label="HEXAGES GAMES ana sayfa">
      <img class="logo-for-dark" src="white.png" alt="HEXAGES GAMES logo" width="38" height="33">
      <img class="logo-for-light" src="logo-dark.png" alt="" width="38" height="33" aria-hidden="true">
      <span>HEXAGES GAMES</span>
    </a>
    <ul class="nav-links">${desktop}</ul>
    <div class="nav-actions">
      <div class="nav-search" id="nav-search" role="search">
        <input type="search" id="nav-search-input" class="nav-search-input" placeholder="ARA" autocomplete="off" aria-label="Sitede ara" aria-controls="nav-search-results" aria-expanded="false">
        <button type="button" class="nav-search-btn" id="nav-search-btn" aria-label="Ara"><span class="ns-glass" aria-hidden="true"></span></button>
        <div class="nav-search-results" id="nav-search-results" role="listbox"></div>
      </div>
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
    <div class="mobile-search"><input type="search" id="mobile-search-input" class="nav-search-input" placeholder="SİTEDE ARA" autocomplete="off" aria-label="Sitede ara"><div class="mobile-search-results" id="mobile-search-results"></div></div>
    ${mobile}
    <div id="mobile-auth" class="mobile-menu-auth"></div>
  </div>
</nav>
`;
}

export function getFooterHTML() {
  const year = new Date().getFullYear();
  return `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-top">
      <a href="index.html" class="footer-brand" aria-label="HEXAGES GAMES ana sayfa">
        <img class="logo-for-dark" src="white.png" alt="HEXAGES GAMES logo" width="44" height="39">
        <img class="logo-for-light" src="logo-dark.png" alt="" width="44" height="39" aria-hidden="true">
        <span>HEXAGES GAMES</span>
      </a>
      <div class="footer-social">
        <a href="https://discord.gg/ETe46SWQtC" target="_blank" rel="noopener">DISCORD</a>
        <a href="https://www.instagram.com/hexagesgames" target="_blank" rel="noopener">INSTAGRAM</a>
        <a href="https://x.com/hexages_games" target="_blank" rel="noopener">X</a>
        <a href="https://www.youtube.com/@zcrosty" target="_blank" rel="noopener">YOUTUBE</a>
      </div>
    </div>

    <div class="footer-grid">
      <div>
        <p class="footer-heading">OYUNLAR</p>
        <div class="footer-links">
          <a href="oyun.html?id=chasing-the-shlump">Chasing the SHlump</a>
          <a href="oyunlar.html">Tüm Oyunlar</a>
          <a href="oyun.html?id=chasing-the-shlump">Geliştirici Haberleri</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">YAZILIM</p>
        <div class="footer-links">
          <a href="launcher.html">Aperon Launcher</a>
          <a href="launcher.html#pluginler">Pluginler</a>
          <a href="https://modrinth.com/plugin/hexagesbanknotes" target="_blank" rel="noopener">Modrinth</a>
          <a href="launcher.html#sss">Sık Sorulan Sorular</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">ŞİRKET</p>
        <div class="footer-links">
          <a href="hakkimizda.html">Hakkımızda</a>
          <a href="iletisim.html">İletişim</a>
          <a href="mailto:hexagesgames@gmail.com">hexagesgames@gmail.com</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">DESTEK</p>
        <div class="footer-links">
          <a href="ticket.html">Destek Talebi</a>
          <a href="profil.html">Profilim</a>
          <a href="ayarlar.html">Ayarlar</a>
          <a href="sifremi-unuttum.html">Şifre Sıfırlama</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">TOPLULUK</p>
        <div class="footer-links">
          <a href="https://discord.gg/ETe46SWQtC" target="_blank" rel="noopener">Discord</a>
          <a href="https://www.instagram.com/hexagesgames" target="_blank" rel="noopener">Instagram</a>
          <a href="https://x.com/hexages_games" target="_blank" rel="noopener">X (Twitter)</a>
          <a href="https://www.youtube.com/@zcrosty" target="_blank" rel="noopener">YouTube</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">YASAL</p>
        <div class="footer-links">
          <a href="privacy.html">Gizlilik Politikası</a>
          <a href="privacy.html#s09">Verilerim ve Haklarım</a>
          <a href="privacy.html#s08">Güvenlik Açığı Bildirimi</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="footer-legal">© ${year} HEXAGES GAMES. Tüm hakları saklıdır. HEXAGES, Aperon, Chasing the SHlump ve ilgili logolar HEXAGES GAMES'e aittir. Minecraft, Mojang Studios'un tescilli markasıdır; Aperon Launcher, Mojang veya Microsoft ile ilişkili değildir. Bu site, üçüncü taraflarca sağlanan kaynaklara bağlantılar içerebilir; bu bağlantılardaki içeriklerden HEXAGES GAMES sorumlu değildir.</p>
      <button type="button" class="footer-top-btn" id="footer-top-btn">YUKARIYA DÖN <span aria-hidden="true">↑</span></button>
    </div>
    <div class="footer-legal-links">
      <a href="privacy.html">Gizlilik</a>
      <a href="hakkimizda.html">Hakkımızda</a>
      <a href="iletisim.html">İletişim</a>
      <a href="ticket.html">Destek</a>
    </div>
  </div>
</footer>
`;
}
