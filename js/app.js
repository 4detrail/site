// ===== FIREBASE CONFIG =====
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
  serverTimestamp,
  query,
  orderBy,
  where,
  getDoc
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

const ADMIN_EMAILS = ['yigittr1922@gmail.com', 'admin@hexages.games'];

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

// ===== STARFIELD =====
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

// ===== CURSOR GLOW =====
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ===== THEME =====
function initTheme() {
  const saved = localStorage.getItem('hx-theme') || 'dark';
  applyTheme(saved);
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

// ===== NAVBAR =====
function initNavbar() {
  const nav = document.querySelector('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const themeBtn = document.getElementById('theme-btn');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.textContent = '☰';
      });
    });
  }
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) link.classList.add('active');
  });
}

// ===== REVEAL =====
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal, .stagger-children').forEach((el) => observer.observe(el));
}

// ===== AUTH NAV =====
function initAuthNav() {
  onAuthStateChanged(auth, (user) => {
    const navAuth = document.getElementById('nav-auth');
    const mobileAuth = document.getElementById('mobile-auth');
    if (!navAuth) return;
    if (user) {
      const name = user.displayName ? user.displayName.split(' ')[0].toUpperCase() : 'PROFİL';
      const adminLink = isAdmin(user.email)
        ? `<a href="fatura.html" style="font-family:var(--font-mono);font-size:11px;color:#f5c542;border:1px solid rgba(245,197,66,0.3);padding:6px 12px;margin-right:8px;transition:all 0.3s" onmouseover="this.style.background='rgba(245,197,66,0.1)'" onmouseout="this.style.background='transparent'">⚡ FATURA</a>`
        : '';
      navAuth.innerHTML = `${adminLink}<a href="profil.html" class="btn-profile">👤 ${sanitize(name)}</a>`;
      if (mobileAuth) {
        const mobileAdminLink = isAdmin(user.email)
          ? `<a href="fatura.html" class="nav-link" style="color:#f5c542">⚡ FATURA YÖNETİMİ</a>`
          : '';
        mobileAuth.innerHTML = `${mobileAdminLink}<a href="profil.html" class="nav-link">→ PROFİL (${sanitize(user.email || '')})</a>`;
      }
    } else {
      navAuth.innerHTML = `<a href="giris.html" class="btn-login">GİRİŞ</a>`;
      if (mobileAuth) mobileAuth.innerHTML = `<a href="giris.html" class="nav-link">→ GİRİŞ YAP</a>`;
    }
  });
}

// ===== FIRESTORE — Ticket =====

async function getTickets() {
  const user = auth.currentUser;
  if (!user) return [];
  try {
    // where + orderBy composite index gerektiriyor, bu yüzden sadece orderBy kullanıp
    // filtrelemeyi client tarafında yapıyoruz
    const q = query(collection(db, 'launcher_tickets'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    const all = snap.docs.map(d => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toDate?.().toISOString() || new Date().toISOString(),
      updatedAt: d.data().updatedAt?.toDate?.().toISOString() || null
    }));
    if (isAdmin(user.email)) return all;
    // uid veya email ile eşleştir (eski JSONBin ticketlar uid içermiyor olabilir)
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

// ===== FIRESTORE — Fatura =====

// Dekont fotoğrafı yükle → Storage'a kaydet, URL döndür
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

// Admin fatura kaydeder
async function saveFatura(fatura, dekontFile) {
  const user = auth.currentUser;
  if (!user || !isAdmin(user.email)) throw new Error('Yetki yok');
  const existing = await getFaturaByNo(fatura.faturaNo);
  if (existing) throw new Error('Bu fatura numarası zaten kullanımda.');

  let dekontURL = null;
  if (dekontFile) {
    dekontURL = await uploadDekontFoto(fatura.faturaNo, dekontFile);
  }

  const docRef = await addDoc(collection(db, 'faturalar'), {
    faturaNo: fatura.faturaNo.trim().toUpperCase(),
    email: fatura.email.trim().toLowerCase(),
    tarih: fatura.tarih,
    aciklama: fatura.aciklama.trim().slice(0, 1000),
    odemeYontemi: fatura.odemeYontemi,
    tutar: fatura.tutar || '',
    durum: 'aktif',
    dekontURL: dekontURL,
    createdAt: serverTimestamp(),
    createdBy: user.email
  });
  return docRef.id;
}

// Fatura numarasına göre sorgula (kullanıcı)
async function getFaturaByNo(faturaNo) {
  if (!faturaNo) return null;
  const q = query(
    collection(db, 'faturalar'),
    where('faturaNo', '==', faturaNo.trim().toUpperCase())
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate?.().toISOString() || null };
}

// Admin — tüm faturalar
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

// Admin — fatura sil (dekont fotoğrafı varsa Storage'dan da siler)
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

export {
  auth, db, storage, isAdmin, sanitize, checkRateLimit,
  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, GoogleAuthProvider, signInWithPopup, updateProfile, sendPasswordResetEmail,
  getTickets, saveTicket, updateTicketStatus,
  saveFatura, getFaturaByNo, getAllFaturalar, uploadDekontFoto, deleteFatura,
  initStarfield, initCursorGlow, initTheme, initNavbar, initReveal, initAuthNav, toggleTheme
};
