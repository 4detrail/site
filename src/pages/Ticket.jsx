import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Shield, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { useAuth } from '@/context/AuthContext';
import { getTickets, saveTicket, updateTicketStatus } from '@/lib/jsonbin';

const CATEGORIES = ['Teknik Destek', 'Öneri', 'Hata Bildirimi', 'Hesap', 'Diğer'];
const STATUS_COLORS = {
  open: 'text-yellow-400 border-yellow-400/30',
  'in-progress': 'text-blue-400 border-blue-400/30',
  resolved: 'text-green-400 border-green-400/30',
  closed: 'text-muted-foreground border-border',
};

function TicketCard({ ticket, isAdmin, onUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [reply, setReply] = useState('');
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (status) => {
    setUpdating(true);
    await updateTicketStatus(ticket.id, status, reply || null);
    onUpdate();
    setUpdating(false);
    setReply('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border hover:border-white/20 transition-colors overflow-hidden"
    >
      <button
        className="w-full p-5 flex items-start justify-between gap-4 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className={`font-mono text-xs border px-2 py-0.5 ${STATUS_COLORS[ticket.status] || STATUS_COLORS.open}`}>
              {ticket.status?.toUpperCase() || 'OPEN'}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{ticket.category}</span>
            <span className="font-mono text-xs text-muted-foreground">#{ticket.id?.slice(-6)}</span>
          </div>
          <p className="font-mono text-sm">{ticket.subject}</p>
          {isAdmin && <p className="font-mono text-xs text-muted-foreground mt-1">{ticket.email}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-xs text-muted-foreground">
            {new Date(ticket.createdAt).toLocaleDateString('tr-TR')}
          </span>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border overflow-hidden"
          >
            <div className="p-5">
              <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-4">{ticket.message}</p>

              {ticket.adminReply && (
                <div className="border border-white/10 p-4 mb-4 bg-white/5">
                  <p className="font-mono text-xs text-muted-foreground mb-2">// ADMIN YANITI</p>
                  <p className="font-mono text-xs">{ticket.adminReply}</p>
                </div>
              )}

              {isAdmin && (
                <div className="space-y-3">
                  <textarea
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    placeholder="Admin yanıtı..."
                    className="w-full bg-transparent border border-border p-3 font-mono text-xs text-foreground placeholder:text-muted-foreground resize-none h-24 focus:border-white/50 focus:outline-none transition-colors"
                  />
                  <div className="flex gap-3 flex-wrap">
                    {['in-progress', 'resolved', 'closed'].map(s => (
                      <button
                        key={s}
                        disabled={updating}
                        onClick={() => handleUpdate(s)}
                        className="font-mono text-xs px-4 py-2 border border-white/20 hover:border-white transition-colors disabled:opacity-50"
                      >
                        {updating ? '...' : s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Ticket() {
  const { user, isAdmin } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ subject: '', category: 'Teknik Destek', message: '' });

  const loadTickets = async () => {
    if (!user) return;
    setLoading(true);
    const all = await getTickets();
    setTickets(isAdmin ? all : all.filter(t => t.email === user.email));
    setLoading(false);
  };

  useEffect(() => { loadTickets(); }, [user, isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    await saveTicket({ ...form, email: user.email, name: user.displayName || user.email });
    setSuccess(true);
    setForm({ subject: '', category: 'Teknik Destek', message: '' });
    await loadTickets();
    setSubmitting(false);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <PageLayout>
      <section className="min-h-screen pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs tracking-widest text-muted-foreground">// DESTEK</span>
              {isAdmin && (
                <span className="font-mono text-xs border border-yellow-400/30 text-yellow-400 px-2 py-0.5 flex items-center gap-1">
                  <Shield size={10} /> ADMIN TERMİNAL
                </span>
              )}
            </div>
            <h1 className="font-heading font-black text-5xl md:text-7xl leading-none">TİCKET</h1>
          </motion.div>

          {!user ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-border p-12 text-center"
            >
              <p className="font-mono text-sm text-muted-foreground mb-6">
                Ticket oluşturmak için giriş yapmanız gerekiyor.
              </p>
              <a
                href="/giris"
                className="inline-block px-8 py-4 border border-white text-xs font-mono tracking-widest bg-white text-black hover:bg-transparent hover:text-white transition-all duration-300"
              >
                GİRİŞ YAP
              </a>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div>
                <h2 className="font-mono text-xs tracking-widest text-muted-foreground mb-6">
                  // YENİ TİCKET {isAdmin && '— ADMIN'}
                </h2>
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="border border-green-500/30 bg-green-500/5 p-4 mb-6 font-mono text-xs text-green-400"
                    >
                      ✓ Ticket başarıyla oluşturuldu. En kısa sürede yanıt vereceğiz.
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-mono text-xs text-muted-foreground block mb-2">KATEGORİ</label>
                    <select
                      value={form.category}
                      onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                      className="w-full bg-transparent border border-border p-3 font-mono text-sm text-foreground focus:border-white/50 focus:outline-none transition-colors"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-xs text-muted-foreground block mb-2">KONU</label>
                    <input
                      required
                      value={form.subject}
                      onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                      placeholder="Ticket konusu..."
                      className="w-full bg-transparent border border-border p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-white/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-muted-foreground block mb-2">MESAJ</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      placeholder="Detaylı açıklama..."
                      rows={6}
                      className="w-full bg-transparent border border-border p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-white/50 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="download-btn-transform w-full py-4 bg-white text-black font-mono text-xs tracking-widest hover:bg-transparent hover:text-white border border-white transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      <><Send size={14} /> TİCKET GÖNDER</>
                    )}
                  </button>
                </form>
              </div>

              {/* Ticket List */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-mono text-xs tracking-widest text-muted-foreground">
                    // {isAdmin ? 'TÜM TİCKETLAR' : 'TİCKETLARIM'}
                  </h2>
                  <button
                    onClick={loadTickets}
                    className="p-2 border border-border hover:border-white/30 transition-colors"
                  >
                    <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
                  </button>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <RefreshCw size={20} className="animate-spin text-muted-foreground" />
                    </div>
                  ) : tickets.length === 0 ? (
                    <div className="border border-border p-8 text-center">
                      <p className="font-mono text-xs text-muted-foreground">Henüz ticket bulunmuyor.</p>
                    </div>
                  ) : (
                    tickets.map(ticket => (
                      <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        isAdmin={isAdmin}
                        onUpdate={loadTickets}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}