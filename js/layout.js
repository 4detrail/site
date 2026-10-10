// Ortak navbar & footer — tüm sayfalar bu dosyayı kullanır.
// Not: Faturalandırma (fatura.html / dekont.html) arayüzden kaldırıldı; sayfalar arka planda çalışmaya devam eder.

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
<div class="scroll-progress" id="scroll-progress" aria-hidden="true"></div>
<div class="grid-overlay"></div>
<div class="scanline"></div>
<div id="cursor-glow"></div>

<nav id="main-nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo" aria-label="HEXAGES GAMES ana sayfa">
      <img class="logo-dark" src="assets/brand/hx-white.png" alt="HEXAGES GAMES logo" width="38" height="34"><img class="logo-light" src="assets/brand/hx-black.png" alt="" aria-hidden="true" width="38" height="34">
      <span>HEXAGES GAMES</span>
    </a>
    <ul class="nav-links">${desktop}</ul>
    <div class="nav-actions">
      <button class="btn-theme btn-textcolor" id="textcolor-btn" type="button" aria-label="Açık temada metin rengini siyah yap" aria-pressed="false" title="Metin rengi: siyah"><span>A</span></button>
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
<footer class="site-footer">
  <div class="footer-cta">
    <div class="footer-cta-inner">
      <div>
        <p class="footer-cta-title">Gelişmelerden ilk sen haberdar ol.</p>
        <p class="footer-cta-sub">Duyurular, geliştirme notları ve yeni sürümler önce Discord'da paylaşılır.</p>
      </div>
      <a href="https://discord.gg/ETe46SWQtC" target="_blank" rel="noopener" class="btn-download">DİSCORD'A KATIL</a>
    </div>
  </div>

  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">
          <img class="logo-dark" src="assets/brand/hx-white.png" alt="HEXAGES GAMES logo" width="44" height="40">
          <img class="logo-light" src="assets/brand/hx-black.png" alt="" aria-hidden="true" width="44" height="40">
          <span>HEXAGES GAMES</span>
        </div>
        <p class="footer-about">Bağımsız oyun stüdyosu. Oyunlarımızı özenle tasarlıyor, topluluğumuzdan gelen geri bildirimlerle şekillendiriyoruz.</p>
        <div class="footer-social">
          <a href="https://discord.gg/ETe46SWQtC" target="_blank" rel="noopener" aria-label="Discord">Discord</a>
          <a href="https://www.instagram.com/hexagesgames" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
          <a href="https://x.com/hexages_games" target="_blank" rel="noopener" aria-label="X">X</a>
          <a href="https://www.youtube.com/@zcrosty" target="_blank" rel="noopener" aria-label="YouTube">YouTube</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">STÜDYO</p>
        <div class="footer-links">
          <a href="index.html">Ana Sayfa</a>
          <a href="hakkimizda.html">Hakkımızda</a>
          <a href="oyunlar.html">Oyunlar</a>
          <a href="iletisim.html">İletişim</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">OYUN</p>
        <div class="footer-links">
          <a href="oyun.html?id=chasing-the-shlump">Chasing the SHlump</a>
          <a href="oyun.html?id=chasing-the-shlump#haberler">Geliştirici Haberleri</a>
          <a href="oyun.html?id=chasing-the-shlump#galeri">Ekran Görüntüleri</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">ARAÇLAR</p>
        <div class="footer-links">
          <a href="launcher.html">Aperon Launcher</a>
          <a href="launcher.html#pluginler">Pluginler</a>
          <a href="ticket.html">Destek Talebi</a>
        </div>
      </div>
      <div>
        <p class="footer-heading">YASAL</p>
        <div class="footer-links">
          <a href="privacy.html">Gizlilik Politikası</a>
          <a href="ayarlar.html">Ayarlar</a>
          <a href="mailto:hexagesgames@gmail.com">hexagesgames@gmail.com</a>
        </div>
      </div>
    </div>
    <div class="footer-wordmark" aria-hidden="true"><svg viewBox="0 0 1000 215" preserveAspectRatio="none" focusable="false"><text x="0" y="205" font-size="270" textLength="1000" lengthAdjust="spacingAndGlyphs">HEXAGES</text></svg></div>
    <div class="footer-bottom">
      <p class="text-muted text-mono" style="font-size:11px">© ${year} HEXAGES GAMES. TÜM HAKLARI SAKLIDIR.</p>
      <p class="text-muted text-mono" style="font-size:11px"><a href="privacy.html" style="color:inherit">GİZLİLİK</a></p>
    </div>
  </div>
</footer>
`;
}
