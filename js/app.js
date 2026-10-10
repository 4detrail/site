import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
  getDoc,
  increment,
  onSnapshot
} from 'https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAroBTexiXeaJGYqMiIIM5POdN2JUuigvo',
  authDomain: 'hexagesgames-f8fe2.firebaseapp.com',
  projectId: 'hexagesgames-f8fe2',
  storageBucket: 'hexagesgames-f8fe2.firebasestorage.app',
  messagingSenderId: '469976981538',
  appId: '1:469976981538:web:c5b49c15b0206c7fb76a7b'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const ADMIN_EMAILS = ['yigittr1922@gmail.com', 'firecrostnetwork@gmail.com', 'hexagesgames@gmail.com', 'wither3169999@gmail.com'];

function isAdmin(email) {
  return email && ADMIN_EMAILS.includes(email.toLowerCase());
}

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

const _rateLimits = {};
function checkRateLimit(key, maxCalls, windowMs) {
  const now = Date.now();
  if (!_rateLimits[key]) _rateLimits[key] = [];
  _rateLimits[key] = _rateLimits[key].filter(t => now - t < windowMs);
  if (_rateLimits[key].length >= maxCalls) return false;
  _rateLimits[key].push(now);
  return true;
}

function validateTicketInput(subject, message, category) {
  const ALLOWED_CATEGORIES = ['Teknik Destek', 'Öneri', 'Hata Bildirimi', 'Hesap', 'Diğer'];
  if (!subject || subject.trim().length < 3 || subject.trim().length > 150) return 'Konu 3-150 karakter arası olmalıdır.';
  if (!message || message.trim().length < 10 || message.trim().length > 2000) return 'Mesaj 10-2000 karakter arası olmalıdır.';
  if (!ALLOWED_CATEGORIES.includes(category)) return 'Geçersiz kategori.';
  return null;
}


function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  const initStars = () => {
    stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2,
      speed: 0.05 + Math.random() * 0.1,
      opacity: 0.1 + Math.random() * 0.7,
      pulse: Math.random() * Math.PI * 2
    }));
  };
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
  };
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((s) => {
      s.pulse += 0.01;
      const o = s.opacity * (0.5 + 0.5 * Math.sin(s.pulse));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${o})`;
      ctx.fill();
      s.y += s.speed;
      if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
    });
    requestAnimationFrame(draw);
  };
  resize(); draw();
  window.addEventListener('resize', resize);
}


function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}


function initTheme() {
  const saved = localStorage.getItem('hx-theme') || 'dark';
  applyTheme(saved);
  if (localStorage.getItem('hx-reduce-motion') === '1') document.documentElement.classList.add('reduce-motion');
  applyTextColor(localStorage.getItem('hx-text-black') === '1');
}
// Açık temada metinleri tam siyah yapma tercihi
function applyTextColor(black) {
  document.documentElement.classList.toggle('text-black', !!black);
  localStorage.setItem('hx-text-black', black ? '1' : '0');
  const b = document.getElementById('textcolor-btn');
  if (b) b.setAttribute('aria-pressed', String(!!black));
}
function applyTheme(theme) {
  if (theme === 'light') document.documentElement.classList.add('light');
  else document.documentElement.classList.remove('light');
  localStorage.setItem('hx-theme', theme);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? '☀' : '☽';
}
function toggleTheme() {
  const current = localStorage.getItem('hx-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}


function initNavbar() {
  const nav = document.querySelector('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const themeBtn = document.getElementById('theme-btn');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  if (hamburger && mobileMenu) {
    const setMenu = (open) => {
      mobileMenu.classList.toggle('open', open);
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
      mobileMenu.setAttribute('aria-hidden', String(!open));
    };
    hamburger.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', () => { if (window.innerWidth > 768) setMenu(false); });
  }
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  const tcBtn = document.getElementById('textcolor-btn');
  if (tcBtn) {
    tcBtn.setAttribute('aria-pressed', String(localStorage.getItem('hx-text-black') === '1'));
    tcBtn.addEventListener('click', () => applyTextColor(localStorage.getItem('hx-text-black') !== '1'));
  }
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) link.classList.add('active');
  });
}


function initReveal() {
  const reduce = document.documentElement.classList.contains('reduce-motion') ||
    matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sayfa genelinde ortak öğelere otomatik giriş animasyonu (yalnızca JS çalışırsa gizlenir)
  const AUTO = '.page-title, .page-sub, .v2-section .v2-h2, .v2-page-card, .ct-card, .pl-card, .faq-item, .side-box, .ln-perk, .ln-note, .ln-card, .ln-spec, .pillar, .news-card, .gd-shots img, .tile, .about-block, .footer-cta-inner';
  const targets = [];
  document.querySelectorAll(AUTO).forEach((el) => {
    if (el.closest('.reveal, .stagger-children, .hero')) return;
    if (el.classList.contains('anim-item')) return;
    el.classList.add('anim-item');
    const sibs = el.parentElement ? Array.from(el.parentElement.children).filter(c => c.classList.contains('anim-item')) : [];
    el.style.setProperty('--d', Math.min(Math.max(sibs.indexOf(el), 0), 5) * 70 + 'ms');
    targets.push(el);
  });

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visible', 'in'); observer.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  document.querySelectorAll('.reveal, .stagger-children, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
  targets.forEach((el) => observer.observe(el));

  // Sayfa kaydırma ilerleme çubuğu
  const bar = document.getElementById('scroll-progress');
  if (bar) {
    const upd = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? Math.min(window.scrollY / h, 1) : 0})`;
    };
    window.addEventListener('scroll', upd, { passive: true }); upd();
  }

  if (reduce) return;

  // Hero dekoru: çok hafif parallax
  const heroArt = document.querySelector('[data-parallax]');
  if (heroArt) {
    window.addEventListener('scroll', () => {
      const y = Math.min(window.scrollY, 700);
      heroArt.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
    }, { passive: true });
  }

  // Büyük kartlar: imleç yönünde ince ışık
  document.querySelectorAll('.big-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  // Sayaç animasyonu: [data-count]
  document.querySelectorAll('[data-count]').forEach((el) => {
    const end = parseInt(el.dataset.count, 10); if (isNaN(end)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const tick = (t) => { const p = Math.min((t - t0) / 1200, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }), { threshold: 0.6 });
    io.observe(el);
  });
}


// Masaüstü profil açılır menüsü: butona tıklanınca menü açılır, doğrudan sayfaya gitmez.
function bindUserMenu() {
  const menu = document.getElementById('user-menu');
  if (!menu) return;
  const btn = menu.querySelector('.user-menu-btn');
  const panel = menu.querySelector('.user-menu-panel');
  const setOpen = (open) => {
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  };
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!menu.classList.contains('open'));
  });
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { setOpen(false); btn.focus(); }
  });
  document.getElementById('um-logout')?.addEventListener('click', async () => {
    try { await signOut(auth); } finally { window.location.href = 'index.html'; }
  });
  panel.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
}

const SITE_PAGES = [
  { href: 'index.html', label: 'ANA SAYFA' },
  { href: 'oyunlar.html', label: 'OYUNLAR' },
  { href: 'oyun.html?id=chasing-the-shlump', label: 'CHASING THE SHLUMP' },
  { href: 'launcher.html', label: 'LAUNCHER' },
  { href: 'hakkimizda.html', label: 'HAKKIMIZDA' },
  { href: 'iletisim.html', label: 'İLETİŞİM' },
  { href: 'ticket.html', label: 'DESTEK' }
];

function pagesHTML() {
  return `<div class="um-group-label">SAYFALAR</div>` +
    SITE_PAGES.map(p => `<a href="${p.href}" role="menuitem" class="um-link">${p.label}</a>`).join('');
}

// Açılır menü (masaüstü): giriş yapan ve yapmayan herkes için
function renderUserMenu(navAuth, user) {
  const loggedIn = !!user;
  const label = loggedIn ? sanitize(user.displayName ? user.displayName.split(' ')[0].toUpperCase() : 'PROFİL') : 'MENÜ';
  const head = loggedIn
    ? `<div class="um-head"><span class="um-head-name">${sanitize(user.displayName || 'Oyuncu')}</span><span class="um-head-mail">${sanitize(user.email || '')}</span></div>`
    : `<div class="um-head"><span class="um-head-name">Hoş geldin</span><span class="um-head-mail">Giriş yaparak profil ve destek özelliklerini kullan</span></div>`;
  const accountItems = loggedIn
    ? `<div class="um-group-label">HESAP</div>
       <a href="profil.html" role="menuitem" class="um-item"><span>Profil</span><small>Hesap ve destek talepleri</small></a>
       <a href="ayarlar.html" role="menuitem" class="um-item"><span>Ayarlar</span><small>Görünüm ve hesap tercihleri</small></a>
       <a href="privacy.html" role="menuitem" class="um-item"><span>Gizlilik Politikası</span><small>Verilerinizin nasıl korunduğu</small></a>
       <button type="button" role="menuitem" class="um-item um-logout" id="um-logout"><span>Çıkış Yap</span><small>Bu cihazdaki oturumu kapat</small></button>`
    : `<div class="um-group-label">HESAP</div>
       <a href="giris.html" role="menuitem" class="um-item"><span>Giriş Yap</span><small>Hesabınla giriş yap ya da kayıt ol</small></a>
       <a href="privacy.html" role="menuitem" class="um-item"><span>Gizlilik Politikası</span><small>Verilerinizin nasıl korunduğu</small></a>`;
  navAuth.innerHTML = `
    <div class="user-menu" id="user-menu">
      <button class="btn-profile user-menu-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="user-menu-panel">
        <span class="um-icon" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="um-name">${label}</span>
      </button>
      <div class="user-menu-panel" id="user-menu-panel" role="menu">
        ${head}
        ${pagesHTML()}
        ${accountItems}
      </div>
    </div>`;
  bindUserMenu();
}

function initAuthNav() {
  onAuthStateChanged(auth, (user) => {
    const navAuth = document.getElementById('nav-auth');
    const mobileAuth = document.getElementById('mobile-auth');
    if (!navAuth) return;
    if (user) {
      const name = user.displayName ? user.displayName.split(' ')[0].toUpperCase() : 'PROFİL';
      const adminLink = '';
      renderUserMenu(navAuth, user);
      if (mobileAuth) {
        const mobileAdminLink = '';
        mobileAuth.innerHTML = `${mobileAdminLink}<a href="profil.html" class="nav-link">→ PROFİL (${sanitize(user.email || '')})</a>`;
      }
    } else {
      renderUserMenu(navAuth, null);
      if (mobileAuth) mobileAuth.innerHTML = `<a href="giris.html" class="nav-link">→ GİRİŞ YAP</a>`;
    }
  });
}



async function getTickets() {
  const user = auth.currentUser;
  if (!user) return [];
  try {

    const q = query(collection(db, 'launcher_tickets'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    const all = snap.docs.map(d => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toDate?.().toISOString() || new Date().toISOString(),
      updatedAt: d.data().updatedAt?.toDate?.().toISOString() || null
    }));
    if (isAdmin(user.email)) return all;

    return all.filter(t => t.uid === user.uid || t.email === user.email);
  } catch (err) {
    console.error('getTickets hatası:', err.code || err.message);
    return [];
  }
}

async function saveTicket(ticket) {
  const user = auth.currentUser;
  if (!user) throw new Error('Oturum açılmamış');
  if (!checkRateLimit('saveTicket_' + user.uid, 3, 10 * 60 * 1000)) {
    throw new Error('Çok fazla istek. Lütfen bekleyin.');
  }
  const err = validateTicketInput(ticket.subject, ticket.message, ticket.category);
  if (err) throw new Error(err);
  const docRef = await addDoc(collection(db, 'launcher_tickets'), {
    subject: ticket.subject.trim().slice(0, 150),
    category: ticket.category,
    message: ticket.message.trim().slice(0, 2000),
    email: user.email,
    name: (user.displayName || user.email || '').slice(0, 80),
    uid: user.uid,
    status: 'open',
    adminReply: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return { id: docRef.id, ...ticket, status: 'open' };
}

async function updateTicketStatus(ticketId, status, adminReply) {
  const user = auth.currentUser;
  if (!user || !isAdmin(user.email)) throw new Error('Yetki yok');
  const ALLOWED_STATUSES = ['open', 'in-progress', 'resolved', 'closed'];
  if (!ALLOWED_STATUSES.includes(status)) throw new Error('Geçersiz durum');
  const ref = doc(db, 'launcher_tickets', ticketId);
  const updates = { status, updatedAt: serverTimestamp() };
  if (adminReply && typeof adminReply === 'string') {
    updates.adminReply = adminReply.trim().slice(0, 1000);
  }
  await updateDoc(ref, updates);
}




async function uploadDekontFoto(faturaNo, file) {
  const user = auth.currentUser;
  if (!user || !isAdmin(user.email)) throw new Error('Yetki yok');
  const ext = file.name.split('.').pop().toLowerCase();
  const allowed = ['jpg', 'jpeg', 'png', 'webp', 'pdf'];
  if (!allowed.includes(ext)) throw new Error('Sadece JPG, PNG, WEBP veya PDF yüklenebilir.');
  if (file.size > 5 * 1024 * 1024) throw new Error('Dosya 5MB\'dan küçük olmalı.');
  const path = `dekontlar/${faturaNo.toUpperCase()}.${ext}`;
  const ref = storageRef(storage, path);
  await uploadBytes(ref, file);
  const url = await getDownloadURL(ref);
  return url;
}


async function saveFatura(fatura, dekontFile) {
  const user = auth.currentUser;
  if (!user || !isAdmin(user.email)) throw new Error('Yetki yok');
  const faturaNo = fatura.faturaNo.trim().toUpperCase();
  if (!/^[A-Z0-9\-]{3,40}$/.test(faturaNo)) throw new Error('Geçersiz fatura numarası formatı.');

  const existing = await getDoc(doc(db, 'faturalar', faturaNo));
  if (existing.exists()) throw new Error('Bu fatura numarası zaten kullanımda.');

  let dekontURL = null;
  if (dekontFile) {
    dekontURL = await uploadDekontFoto(faturaNo, dekontFile);
  }

  await setDoc(doc(db, 'faturalar', faturaNo), {
    faturaNo: faturaNo,
    email: fatura.email.trim().toLowerCase(),
    tarih: fatura.tarih,
    aciklama: fatura.aciklama.trim(),
    odemeYontemi: fatura.odemeYontemi,
    tutar: fatura.tutar || '',
    durum: 'aktif',
    dekontURL: dekontURL,
    createdAt: serverTimestamp(),
    createdBy: user.email
  });
  return faturaNo;
}


async function getFaturaByNo(faturaNo) {
  if (!faturaNo) return null;
  const user = auth.currentUser;
  if (!user) return null;
  const no = faturaNo.trim().toUpperCase();

  const snap = await getDoc(doc(db, 'faturalar', no));
  if (!snap.exists()) return null;
  const data = snap.data();

  if (!isAdmin(user.email) && user.email.toLowerCase() !== (data.email || '').toLowerCase()) {
    return null;
  }

  return { id: snap.id, ...data, createdAt: data.createdAt?.toDate?.().toISOString() || null };
}


async function getAllFaturalar() {
  const user = auth.currentUser;
  if (!user || !isAdmin(user.email)) throw new Error('Yetki yok');
  const q = query(collection(db, 'faturalar'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt?.toDate?.().toISOString() || null
  }));
}


async function deleteFatura(faturaId, dekontURL) {
  const user = auth.currentUser;
  if (!user || !isAdmin(user.email)) throw new Error('Yetki yok');
  if (dekontURL) {
    try {
      const path = decodeURIComponent(dekontURL.split('/o/')[1].split('?')[0]);
      await deleteObject(storageRef(storage, path));
    } catch (err) {
      console.warn('Dekont dosyası silinemedi:', err.code || err.message);
    }
  }
  await deleteDoc(doc(db, 'faturalar', faturaId));
}

async function getThreatLogs() {
  const user = auth.currentUser;
  if (!user || !isAdmin(user.email)) throw new Error('Yetki yok');
  const q = query(collection(db, 'threat_logs'), orderBy('loggedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({
    id: d.id,
    ...d.data(),
    loggedAt: d.data().loggedAt?.toDate?.().toISOString() || null
  }));
}

async function updateThreatLogStatus(logId, status) {
  const user = auth.currentUser;
  if (!user || !isAdmin(user.email)) throw new Error('Yetki yok');
  const ALLOWED_STATUSES = ['new', 'reviewed', 'reported_to_authorities', 'dismissed'];
  if (!ALLOWED_STATUSES.includes(status)) throw new Error('Geçersiz durum');
  const ref = doc(db, 'threat_logs', logId);
  await updateDoc(ref, { status, reviewedBy: user.email, reviewedAt: serverTimestamp() });
}

async function getGuildConfigs() {
  const user = auth.currentUser;
  if (!user || !isAdmin(user.email)) throw new Error('Yetki yok');
  const snap = await getDocs(collection(db, 'guild_configs'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ===== CANLI İNDİRME SAYACI (launcher_stats) =====
// Her indirme butonuna tıklandığında sayaç +1 artar (Firestore increment ile atomik).
// Aynı tarayıcıdan art arda tıklamalarda kısa süreli bir bekleme (debounce) uygulanır.
function trackLauncherDownload(statId) {
  try {
    const guardKey = 'hx_dl_guard_' + statId;
    const last = Number(sessionStorage.getItem(guardKey) || 0);
    const now = Date.now();
    if (now - last < 8000) return; // 8 sn içinde tekrar sayma (yanlışlıkla çift tıklama)
    sessionStorage.setItem(guardKey, String(now));
    updateDoc(doc(db, 'launcher_stats', statId), { count: increment(1) }).catch((err) => {
      console.warn('İndirme sayacı güncellenemedi:', err.code || err.message);
    });
  } catch (err) {
    console.warn('İndirme sayacı hatası:', err.message);
  }
}

// Sayacı canlı dinler; her değişiklikte callback(count) çağrılır. Aboneliği kapatan fonksiyonu döndürür.
function subscribeLauncherDownloadCount(statId, callback) {
  try {
    return onSnapshot(doc(db, 'launcher_stats', statId), (snap) => {
      callback(snap.exists() ? (snap.data().count || 0) : 0);
    }, (err) => {
      console.warn('İndirme sayacı dinlenemedi:', err.code || err.message);
      callback(null);
    });
  } catch (err) {
    console.warn('İndirme sayacı hatası:', err.message);
    callback(null);
    return () => {};
  }
}

// ===== OYUN HABERLERİ (game_news) =====
// Herkes okuyabilir; yazma/silme sadece admin. Sorgu tek alan filtresi kullanır (composite index gerektirmez).
const NEWS_CATEGORIES = ['Duyuru', 'Güncelleme', 'Haber', 'Yama Notu'];

async function getGameNews(gameId) {
  const q = query(collection(db, 'game_news'), where('gameId', '==', gameId));
  const snap = await getDocs(q);
  return snap.docs
    .map(d => {
      const x = d.data();
      return {
        id: d.id,
        ...x,
        createdAt: x.createdAt?.toDate?.().toISOString() || null
      };
    })
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
}

async function uploadNewsImage(gameId, file) {
  const user = auth.currentUser;
  if (!user || !isAdmin(user.email)) throw new Error('Yetki yok');
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  if (!['png', 'jpg', 'jpeg', 'webp'].includes(ext)) throw new Error('Sadece PNG, JPG veya WEBP yüklenebilir.');
  if (file.size > 5 * 1024 * 1024) throw new Error('Görsel 5 MB\'den küçük olmalı.');
  const path = `game-news/${gameId}/${Date.now()}.${ext}`;
  const ref = storageRef(storage, path);
  await uploadBytes(ref, file);
  return await getDownloadURL(ref);
}

function validateNews(item) {
  if (!item.title || item.title.trim().length < 3 || item.title.trim().length > 150) return 'Başlık 3-150 karakter olmalıdır.';
  if (!item.body || item.body.trim().length < 10 || item.body.trim().length > 5000) return 'İçerik 10-5000 karakter olmalıdır.';
  if (!NEWS_CATEGORIES.includes(item.category)) return 'Geçersiz kategori.';
  if (!item.gameId || !/^[a-z0-9-]{2,60}$/.test(item.gameId)) return 'Geçersiz oyun kimliği.';
  return null;
}

async function createGameNews(item) {
  const user = auth.currentUser;
  if (!user || !isAdmin(user.email)) throw new Error('Yetki yok');
  const err = validateNews(item);
  if (err) throw new Error(err);
  const ref = await addDoc(collection(db, 'game_news'), {
    gameId: item.gameId,
    title: item.title.trim().slice(0, 150),
    category: item.category,
    body: item.body.trim().slice(0, 5000),
    imageURL: item.imageURL || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: user.email
  });
  return ref.id;
}

async function updateGameNews(newsId, item) {
  const user = auth.currentUser;
  if (!user || !isAdmin(user.email)) throw new Error('Yetki yok');
  const err = validateNews(item);
  if (err) throw new Error(err);
  await updateDoc(doc(db, 'game_news', newsId), {
    title: item.title.trim().slice(0, 150),
    category: item.category,
    body: item.body.trim().slice(0, 5000),
    imageURL: item.imageURL || null,
    updatedAt: serverTimestamp()
  });
}

async function deleteGameNews(newsId) {
  const user = auth.currentUser;
  if (!user || !isAdmin(user.email)) throw new Error('Yetki yok');
  await deleteDoc(doc(db, 'game_news', newsId));
}

export {
  auth, db, storage, isAdmin, sanitize, checkRateLimit,
  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, GoogleAuthProvider, signInWithPopup, updateProfile, sendPasswordResetEmail,
  getTickets, saveTicket, updateTicketStatus,
  saveFatura, getFaturaByNo, getAllFaturalar, uploadDekontFoto, deleteFatura,
  getThreatLogs, updateThreatLogStatus, getGuildConfigs,
  trackLauncherDownload, subscribeLauncherDownloadCount,
  getGameNews, uploadNewsImage, createGameNews, updateGameNews, deleteGameNews, NEWS_CATEGORIES,
  initStarfield, initCursorGlow, initTheme, initNavbar, initReveal, initAuthNav, toggleTheme, applyTheme, applyTextColor
};
