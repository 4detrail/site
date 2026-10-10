import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js';
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


// Eski görsel efektler kaldırıldı. Sayfalar bu isimleri hâlâ çağırdığı için boş bırakıldı.
function initStarfield() {}
function initCursorGlow() {}
function toggleTheme() {}
function initTheme() {
  // Site tek temalı (siyah). Eski açık tema kaydı varsa temizle.
  document.documentElement.classList.remove('light');
  try { localStorage.removeItem('hx-theme'); } catch (e) {}
}

function initNavbar() {
  const nav = document.querySelector('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (hamburger && mobileMenu) {
    const setOpen = (open) => {
      hamburger.classList.toggle('is-active', open);
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
      mobileMenu.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('menu-open', open);
    };
    hamburger.addEventListener('click', () => setOpen(!mobileMenu.classList.contains('open')));
    mobileMenu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', () => { if (window.innerWidth > 900) setOpen(false); });
  }

  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === page) { link.classList.add('active'); link.setAttribute('aria-current', 'page'); }
  });
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('visible')); return; }
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
    { threshold: 0.08 }
  );
  els.forEach((el) => observer.observe(el));
}


function initAuthNav() {
  onAuthStateChanged(auth, (user) => {
    const navAuth = document.getElementById('nav-auth');
    const mobileAuth = document.getElementById('mobile-auth');
    if (!navAuth) return;
    if (user) {
      const name = user.displayName ? user.displayName.split(' ')[0].toUpperCase() : 'PROFİL';
      const admin = isAdmin(user.email);
      navAuth.innerHTML =
        (admin ? `<a href="guvenlik.html" class="btn-login btn-ghost">GÜVENLİK</a>` : '') +
        `<a href="profil.html" class="btn-login">${sanitize(name)}</a>`;
      if (mobileAuth) {
        mobileAuth.innerHTML =
          (admin ? `<a href="guvenlik.html" class="nav-link">Güvenlik</a>` : '') +
          `<a href="profil.html" class="nav-link">Profil</a>`;
      }
    } else {
      navAuth.innerHTML = `<a href="giris.html" class="btn-login">GİRİŞ YAP</a>`;
      if (mobileAuth) mobileAuth.innerHTML = `<a href="giris.html" class="nav-link">Giriş Yap</a>`;
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

export {
  auth, db, isAdmin, sanitize, checkRateLimit,
  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, GoogleAuthProvider, signInWithPopup, updateProfile, sendPasswordResetEmail,
  getTickets, saveTicket, updateTicketStatus,
  getThreatLogs, updateThreatLogStatus, getGuildConfigs,
  trackLauncherDownload, subscribeLauncherDownloadCount,
  initStarfield, initCursorGlow, initTheme, initNavbar, initReveal, initAuthNav, toggleTheme
};
