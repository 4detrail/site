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

const ADMIN_EMAILS = ['yigittr1922@gmail.com'];

function isAdmin(email) {
  return email && ADMIN_EMAILS.includes(email.toLowerCase());
}

// ===== STARFIELD =====
function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animId;
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
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }
    });
    animId = requestAnimationFrame(draw);
  };

  resize();
  draw();
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
  if (theme === 'light') {
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
  }
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
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ===== REVEAL / INTERSECT =====
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal, .stagger-children').forEach((el) => observer.observe(el));
}

// ===== AUTH STATE NAV UPDATE =====
function initAuthNav() {
  onAuthStateChanged(auth, (user) => {
    const navAuth = document.getElementById('nav-auth');
    if (!navAuth) return;
    if (user) {
      const name = user.displayName
        ? user.displayName.split(' ')[0].toUpperCase()
        : 'PROFİL';
      navAuth.innerHTML = `<a href="profil.html" class="btn-profile">👤 ${name}</a>`;
    } else {
      navAuth.innerHTML = `<a href="giris.html" class="btn-login">GİRİŞ</a>`;
    }
  });
}

// ===== JSONBIN (Ticket System) =====
const JSONBIN_BIN_ID = '6a22e834da38895dfe8cee1d';
const JSONBIN_API_KEY = '$2a$10$acvRRZVB0w0jZgC48GZcY.ojQfJp0I4nZm4d4yEAnsdPZFJmZpGIu';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

async function getTickets() {
  try {
    const res = await fetch(`${JSONBIN_URL}/latest`, {
      headers: { 'X-Master-Key': JSONBIN_API_KEY }
    });
    const data = await res.json();
    return data.record?.tickets || [];
  } catch {
    return [];
  }
}

async function saveTicket(ticket) {
  const tickets = await getTickets();
  const newTicket = {
    ...ticket,
    id: Date.now().toString(),
    status: 'open',
    createdAt: new Date().toISOString()
  };
  tickets.push(newTicket);
  await fetch(JSONBIN_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': JSONBIN_API_KEY
    },
    body: JSON.stringify({ tickets })
  });
  return newTicket;
}

async function updateTicketStatus(ticketId, status, adminReply) {
  const tickets = await getTickets();
  const idx = tickets.findIndex((t) => t.id === ticketId);
  if (idx === -1) return;
  tickets[idx].status = status;
  if (adminReply) tickets[idx].adminReply = adminReply;
  tickets[idx].updatedAt = new Date().toISOString();
  await fetch(JSONBIN_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': JSONBIN_API_KEY
    },
    body: JSON.stringify({ tickets })
  });
}

export {
  auth,
  isAdmin,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  getTickets,
  saveTicket,
  updateTicketStatus,
  initStarfield,
  initCursorGlow,
  initTheme,
  initNavbar,
  initReveal,
  initAuthNav,
  toggleTheme
};
