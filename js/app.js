// ===== FIREBASE CONFIG =====
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
  serverTimestamp,
  query,
  orderBy
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
      navAuth.innerHTML = `<a href="profil.html" class="btn-profile">👤 ${sanitize(name)}</a>`;
      if (mobileAuth) mobileAuth.innerHTML = `<a href="profil.html" class="nav-link">→ PROFİL (${sanitize(user.email || '')})</a>`;
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

export {
  auth, db, isAdmin, sanitize, checkRateLimit,
  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, GoogleAuthProvider, signInWithPopup, updateProfile, sendPasswordResetEmail,
  getTickets, saveTicket, updateTicketStatus,
  initStarfield, initCursorGlow, initTheme, initNavbar, initReveal, initAuthNav, toggleTheme
};
