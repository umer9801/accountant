import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Mail, Star, Check, Trash2, Eye, EyeOff,
  Users, MessageSquare, Clock, ChevronRight, X, Menu
} from "lucide-react";

const API = "/api";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

// ─── Auth helpers ─────────────────────────────────────────────
function getToken() { return localStorage.getItem("admin_token"); }
function setToken(t: string) { localStorage.setItem("admin_token", t); }
function clearToken() { localStorage.removeItem("admin_token"); }

async function apiFetch(path: string, opts: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ─── Types ────────────────────────────────────────────────────
type Contact = {
  _id: string; name: string; email: string; phone: string;
  company: string; service: string; message: string;
  read: boolean; createdAt: string;
};
type Review = {
  _id: string; name: string; role: string; quote: string;
  rating: number; status: "pending" | "approved"; createdAt: string;
};

// ─── Main page ────────────────────────────────────────────────
function AdminPage() {
  const [token, setTokenState] = useState(getToken());
  const navigate = useNavigate();

  const logout = () => { clearToken(); setTokenState(null); };

  if (!token) {
    return <LoginPage onLogin={(t) => { setToken(t); setTokenState(t); }} />;
  }
  return <Dashboard onLogout={logout} />;
}

// ─── Login ────────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: (t: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const data = await apiFetch("/admin/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      onLogin(data.token);
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--navy)] flex items-center justify-center px-4">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white rounded-3xl p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-11 w-11 rounded-2xl gradient-brand flex items-center justify-center text-white font-bold">A</div>
            <div>
              <div className="font-bold text-lg">Proper Accounting Ltd</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Admin Portal</div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-6">Sign in</h1>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Username</label>
              <input
                value={username} onChange={e => setUsername(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[color:var(--royal)]/30"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative mt-2">
                <input
                  type={showPass ? "text" : "password"}
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[color:var(--royal)]/30 pr-12"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit" disabled={loading}
              className="w-full rounded-full gradient-brand text-white py-3.5 font-semibold disabled:opacity-60 transition"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<"contacts" | "reviews">("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [c, r] = await Promise.all([
        apiFetch("/admin/contacts"),
        apiFetch("/admin/reviews"),
      ]);
      setContacts(c);
      setReviews(r);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const deleteContact = async (id: string) => {
    await apiFetch(`/admin/contacts/${id}`, { method: "DELETE" });
    setContacts(prev => prev.filter(c => c._id !== id));
    if (selectedContact?._id === id) setSelectedContact(null);
  };

  const approveReview = async (id: string) => {
    await apiFetch(`/admin/reviews/${id}/approve`, { method: "PATCH" });
    setReviews(prev => prev.map(r => r._id === id ? { ...r, status: "approved" } : r));
  };

  const deleteReview = async (id: string) => {
    await apiFetch(`/admin/reviews/${id}`, { method: "DELETE" });
    setReviews(prev => prev.filter(r => r._id !== id));
  };

  const pendingReviews = reviews.filter(r => r.status === "pending").length;
  const unreadContacts = contacts.filter(c => !c.read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar backdrop mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[color:var(--navy)] text-white z-30 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-brand flex items-center justify-center font-bold text-sm">A</div>
            <div>
              <div className="font-bold text-sm">Proper Accounting Ltd</div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest">Admin</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { key: "contacts", label: "Contact Forms", icon: Mail, badge: unreadContacts },
            { key: "reviews", label: "Reviews", icon: Star, badge: pendingReviews },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => { setTab(item.key as any); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition ${
                tab === item.key ? "gradient-brand text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                {item.label}
              </div>
              {item.badge > 0 && (
                <span className="h-5 min-w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white/70 hover:bg-white/10 hover:text-white transition text-sm">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden h-9 w-9 rounded-xl border flex items-center justify-center">
              <Menu className="h-4 w-4" />
            </button>
            <h1 className="font-bold text-lg capitalize">
              {tab === "contacts" ? "Contact Forms" : "Reviews"}
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="hidden sm:block">{new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
        </header>

        {/* Stats row */}
        <div className="px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Contacts", value: contacts.length, icon: Mail, color: "text-blue-600" },
            { label: "Unread", value: unreadContacts, icon: MessageSquare, color: "text-orange-500" },
            { label: "Pending Reviews", value: pendingReviews, icon: Clock, color: "text-yellow-500" },
            { label: "Approved Reviews", value: reviews.filter(r => r.status === "approved").length, icon: Users, color: "text-green-600" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className={`${s.color} mb-2`}><s.icon className="h-5 w-5" /></div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pb-6">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-muted-foreground">Loading…</div>
          ) : tab === "contacts" ? (
            <ContactsTab
              contacts={contacts}
              selected={selectedContact}
              onSelect={setSelectedContact}
              onDelete={deleteContact}
            />
          ) : (
            <ReviewsTab
              reviews={reviews}
              onApprove={approveReview}
              onDelete={deleteReview}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Contacts Tab ─────────────────────────────────────────────
function ContactsTab({ contacts, selected, onSelect, onDelete }: {
  contacts: Contact[];
  selected: Contact | null;
  onSelect: (c: Contact | null) => void;
  onDelete: (id: string) => void;
}) {
  if (contacts.length === 0) {
    return <EmptyState icon={Mail} text="No contact submissions yet" />;
  }

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-4 h-full">
      {/* List */}
      <div className="space-y-2">
        {contacts.map((c) => (
          <motion.div
            key={c._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onSelect(selected?._id === c._id ? null : c)}
            className={`bg-white rounded-2xl p-4 shadow-sm cursor-pointer transition hover:shadow-md flex items-start justify-between gap-3 ${
              selected?._id === c._id ? "ring-2 ring-[color:var(--royal)]" : ""
            }`}
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className={`mt-0.5 h-2.5 w-2.5 rounded-full shrink-0 ${c.read ? "bg-slate-300" : "bg-blue-500"}`} />
              <div className="min-w-0">
                <div className="font-semibold text-sm">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.email}</div>
                {c.service && <div className="text-xs text-[color:var(--royal)] mt-1 font-medium">{c.service}</div>}
                <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{c.message}</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="text-[10px] text-muted-foreground whitespace-nowrap">
                {new Date(c.createdAt).toLocaleDateString("en-GB")}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(c._id); }}
                className="h-7 w-7 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 flex items-center justify-center transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-4"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold">Message Detail</h3>
              <button onClick={() => onSelect(null)} className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <Row label="Name" value={selected.name} />
              <Row label="Email" value={selected.email} />
              {selected.phone && <Row label="Phone" value={selected.phone} />}
              {selected.company && <Row label="Company" value={selected.company} />}
              {selected.service && <Row label="Service" value={selected.service} />}
              <div>
                <div className="text-xs text-muted-foreground mb-1">Message</div>
                <div className="bg-slate-50 rounded-xl p-3 text-sm leading-relaxed">{selected.message}</div>
              </div>
              <div className="text-xs text-muted-foreground">
                Received: {new Date(selected.createdAt).toLocaleString("en-GB")}
              </div>
            </div>
            <button
              onClick={() => onDelete(selected._id)}
              className="mt-5 w-full rounded-full border border-red-200 text-red-500 py-2.5 text-sm font-medium hover:bg-red-50 transition flex items-center justify-center gap-2"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Reviews Tab ──────────────────────────────────────────────
function ReviewsTab({ reviews, onApprove, onDelete }: {
  reviews: Review[];
  onApprove: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const pending = reviews.filter(r => r.status === "pending");
  const approved = reviews.filter(r => r.status === "approved");

  if (reviews.length === 0) {
    return <EmptyState icon={Star} text="No reviews submitted yet" />;
  }

  return (
    <div className="space-y-6">
      {pending.length > 0 && (
        <div>
          <h2 className="font-semibold text-sm text-orange-500 uppercase tracking-widest mb-3">
            Pending Approval ({pending.length})
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pending.map(r => (
              <ReviewCard key={r._id} review={r} onApprove={onApprove} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}
      {approved.length > 0 && (
        <div>
          <h2 className="font-semibold text-sm text-green-600 uppercase tracking-widest mb-3">
            Approved ({approved.length})
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {approved.map(r => (
              <ReviewCard key={r._id} review={r} onApprove={onApprove} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewCard({ review, onApprove, onDelete }: {
  review: Review;
  onApprove: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="font-semibold text-sm">{review.name}</div>
          {review.role && <div className="text-xs text-muted-foreground">{review.role}</div>}
        </div>
        <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
          review.status === "approved" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-600"
        }`}>
          {review.status === "approved" ? "Approved" : "Pending"}
        </span>
      </div>
      <div className="flex gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200 fill-slate-200"}`} />
        ))}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">"{review.quote}"</p>
      <div className="flex gap-2 mt-4">
        {review.status === "pending" && (
          <button
            onClick={() => onApprove(review._id)}
            className="flex-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold py-2 hover:bg-green-100 transition flex items-center justify-center gap-1"
          >
            <Check className="h-3.5 w-3.5" /> Approve
          </button>
        )}
        <button
          onClick={() => onDelete(review._id)}
          className="flex-1 rounded-full bg-red-50 text-red-500 text-xs font-semibold py-2 hover:bg-red-100 transition flex items-center justify-center gap-1"
        >
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </button>
      </div>
    </motion.div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function EmptyState({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-40 gap-3 text-muted-foreground">
      <Icon className="h-8 w-8 opacity-30" />
      <p className="text-sm">{text}</p>
    </div>
  );
}
