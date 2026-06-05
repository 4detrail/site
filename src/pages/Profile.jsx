import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, LogOut, Edit2, Check, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import PageLayout from '@/components/layout/PageLayout';

export default function Profile() {
  const { user, logout, isAdmin, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || '');
  const [saving, setSaving] = useState(false);

  if (!user) {
    navigate('/giris');
    return null;
  }

  const handleSave = async () => {
    setSaving(true);
    await updateUserProfile({ displayName: newName });
    setSaving(false);
    setEditing(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const joinDate = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Bilinmiyor';

  const avatarLetter = (user.displayName || user.email || 'U')[0].toUpperCase();

  return (
    <PageLayout>
      <section className="min-h-screen pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="font-mono text-xs tracking-widest text-muted-foreground">// OYUNCU DOSYASI</span>
            <h1 className="font-heading font-black text-5xl md:text-7xl mt-2 leading-none">PROFİL</h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Avatar / Identity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-border p-8 flex flex-col items-center gap-6"
            >
              {/* Avatar */}
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-24 h-24 rounded-full border border-border" />
              ) : (
                <div className="w-24 h-24 border border-white/30 flex items-center justify-center bg-white/5 float-anim">
                  <span className="font-heading font-black text-3xl">{avatarLetter}</span>
                </div>
              )}

              {/* Access Level Badge */}
              <div className={`flex items-center gap-2 border px-4 py-2 font-mono text-xs tracking-widest ${
                isAdmin ? 'border-yellow-400/50 text-yellow-400' : 'border-white/20 text-muted-foreground'
              }`}>
                {isAdmin && <Shield size={12} />}
                {isAdmin ? 'ADMIN ACCESS' : 'USER ACCESS'}
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-3 border border-red-500/30 text-red-400 font-mono text-xs tracking-widest hover:border-red-500 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
              >
                <LogOut size={12} /> ÇIKIŞ YAP
              </button>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 border border-border p-8 space-y-6"
            >
              <h2 className="font-mono text-xs tracking-widest text-muted-foreground">// KİMLİK BİLGİLERİ</h2>

              {/* Display Name */}
              <div className="border-b border-border pb-6">
                <label className="font-mono text-xs text-muted-foreground block mb-2">KULLANICI ADI</label>
                {editing ? (
                  <div className="flex gap-3">
                    <input
                      value={newName}
                      onChange={e => setNewName(e.target.value)}
                      className="flex-1 bg-transparent border border-white/30 px-3 py-2 font-mono text-sm text-foreground focus:border-white/60 focus:outline-none transition-colors"
                    />
                    <button onClick={handleSave} disabled={saving}
                      className="p-2 border border-green-500/30 text-green-400 hover:border-green-500 transition-colors">
                      <Check size={14} />
                    </button>
                    <button onClick={() => setEditing(false)}
                      className="p-2 border border-red-500/30 text-red-400 hover:border-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-black text-xl">{user.displayName || 'İsimsiz Oyuncu'}</span>
                    <button onClick={() => setEditing(true)}
                      className="p-1.5 border border-border hover:border-white/30 transition-colors">
                      <Edit2 size={12} />
                    </button>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="border-b border-border pb-6">
                <label className="font-mono text-xs text-muted-foreground block mb-2">E-POSTA</label>
                <span className="font-mono text-sm">{user.email}</span>
              </div>

              {/* Join Date */}
              <div className="border-b border-border pb-6">
                <label className="font-mono text-xs text-muted-foreground block mb-2">KAYIT TARİHİ</label>
                <span className="font-mono text-sm">{joinDate}</span>
              </div>

              {/* UID */}
              <div>
                <label className="font-mono text-xs text-muted-foreground block mb-2">OYUNCU ID</label>
                <span className="font-mono text-xs text-muted-foreground">{user.uid}</span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="md:col-span-3 border border-border p-8"
            >
              <h2 className="font-mono text-xs tracking-widest text-muted-foreground mb-6">// HIZLI ERİŞİM</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'TİCKETLARIM', href: '/ticket', desc: 'Destek taleplerim' },
                  { label: 'LAUNCHER', href: '/launcher', desc: 'İndir & güncelle' },
                  { label: 'OYUNLAR', href: '/oyunlar', desc: 'Gelecek projeler' },
                  { label: 'DİSCORD', href: 'https://discord.gg/ETe46SWQtC', desc: 'Topluluğa katıl', ext: true },
                ].map(({ label, href, desc, ext }) => (
                  <a
                    key={label}
                    href={href}
                    target={ext ? '_blank' : undefined}
                    rel={ext ? 'noopener noreferrer' : undefined}
                    className="border border-border p-5 hover:border-white/30 hover:bg-white/5 transition-all group"
                  >
                    <p className="font-mono text-xs tracking-widest mb-1 group-hover:text-white transition-colors">{label}</p>
                    <p className="font-mono text-xs text-muted-foreground">{desc}</p>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}