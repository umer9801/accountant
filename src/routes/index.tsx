import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";
import {
  ArrowRight, Sparkles, Shield, Cloud, Zap, Users, Lock, BadgeCheck,
  Briefcase, Building2, Stethoscope, ShoppingBag, UtensilsCrossed, Home as HomeIcon,
  Hammer, UserRound, Package, CheckCircle2, TrendingUp, PoundSterling, Calculator, FileText,
  Star, ChevronDown,
} from "lucide-react";
import { Section, SectionHeading, Eyebrow, fadeUp } from "@/components/site/primitives";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Proper Accounting Ltd — Premium UK Accounting" },
      { name: "description", content: "Modern, reliable and affordable UK accounting for freelancers, contractors, SMEs and growing businesses." },
      { property: "og:title", content: "Proper Accounting Ltd" },
      { property: "og:description", content: "Your trusted accounting partner in the UK." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80" },
    ],
  }),
  component: HomePage,
});

const HERO_IMG = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80";

function HomePage() {
  return (
    <>
      <Hero />
      <ProudPartnerships />
      <WhyChooseUs />
      <FeaturedServices />
      <HowWeWork />
      <Industries />
      <Testimonials />
      <LatestUpdates />
      <FAQ />
      <Newsletter />
    </>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} className="relative pt-36 pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <motion.div style={{ y: y1 }} className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[color:var(--royal)]/25 blur-3xl" />
        <motion.div style={{ y: y2 }} className="absolute top-40 -right-40 h-[600px] w-[600px] rounded-full bg-[color:var(--emerald)]/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
        <div>
          <Eyebrow>UK Accountants · Manchester</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight"
          >
            Your Trusted <span className="text-gradient">Accounting Partner</span> in the UK
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl"
          >
            Managing finances shouldn't slow your business down. At Proper Accounting Ltd,
            we deliver modern, reliable and affordable accounting for freelancers, SMEs, landlords
            and growing businesses across the United Kingdom.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full gradient-brand px-7 py-3.5 text-white font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition">
              Book Free Consultation
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-semibold hover:-translate-y-0.5 transition">
              Explore Services
            </Link>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { s: "IFW", l: "Regulated Practice", raw: true },
              { s: "MTD", l: "Ready & Compliant", raw: true },
              { s: "Fixed", l: "Monthly Pricing", raw: true },
              { s: "No", l: "Hidden Charges", raw: true },
            ].map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass rounded-2xl px-4 py-4"
              >
                <div className="text-2xl font-bold text-gradient">
                  {it.raw ? it.s : <><CountUp end={it.n} duration={2} enableScrollSpy scrollSpyOnce />{it.s}</>}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{it.l}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className="relative">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative rounded-[28px] overflow-hidden shadow-2xl ring-1 ring-black/5">
            <img src={HERO_IMG} alt="UK accountants at work" className="w-full h-[540px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--navy)]/50 via-transparent to-transparent" />
          </motion.div>

          {/* Floating cards */}
          <FloatingCard delay={0.4} className="absolute -top-6 -left-6" icon={<PoundSterling className="h-4 w-4" />} label="Monthly Income" value="£48,320" trend="+12.4%" />
          <FloatingCard delay={0.7} className="absolute top-1/3 -right-6" icon={<TrendingUp className="h-4 w-4" />} label="Tax Saved" value="£8,140" trend="YTD" />
          <FloatingCard delay={1} className="absolute -bottom-6 left-6" icon={<CheckCircle2 className="h-4 w-4" />} label="HMRC Compliance" value="100%" trend="On track" />
        </div>
      </div>
    </section>
  );
}

function FloatingCard({ icon, label, value, trend, className, delay = 0 }: { icon: React.ReactNode; label: string; value: string; trend: string; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay }}
      className={`glass rounded-2xl px-4 py-3 min-w-[190px] ${className}`}
    >
      <div className="animate-float">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-7 w-7 rounded-lg gradient-brand text-white flex items-center justify-center">{icon}</span>
          {label}
        </div>
        <div className="mt-1.5 flex items-baseline justify-between">
          <div className="text-lg font-bold">{value}</div>
          <div className="text-[10px] font-semibold text-[color:var(--emerald)]">{trend}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- WHY ---------------- */
function WhyChooseUs() {
  const items = [
    { icon: UserRound, title: "Dedicated Accountant", desc: "One senior expert handles your account end-to-end." },
    { icon: BadgeCheck, title: "Fixed Transparent Pricing", desc: "Clear monthly plans. No surprise fees, ever." },
    { icon: Shield, title: "HMRC Compliance", desc: "Filings, deadlines and rules — handled." },
    { icon: Cloud, title: "Cloud Accounting", desc: "Xero, QuickBooks & FreeAgent partners." },
    { icon: Zap, title: "Fast Response", desc: "Same-day replies during business hours." },
    { icon: Users, title: "Unlimited Support", desc: "Call, message or meet — as often as you need." },
    { icon: Lock, title: "Secure Digital Solutions", desc: "Bank-grade encryption on every document." },
    { icon: Sparkles, title: "Proactive Advice", desc: "Insights that help you save and grow." },
  ];
  return (
    <Section>
      <SectionHeading eyebrow="Why Choose Us" title={<>Built for modern <span className="text-gradient">UK businesses</span></>} subtitle="A better way to manage your accounts — faster, smarter and always in your corner." />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-3xl p-6 glass hover:ring-glow transition"
          >
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition" style={{ background: "linear-gradient(135deg, rgba(29,78,216,0.08), rgba(16,185,129,0.08))" }} />
            <div className="relative">
              <div className="h-12 w-12 rounded-2xl gradient-brand flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition">
                <it.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-semibold text-lg">{it.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{it.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- FEATURED SERVICES ---------------- */
const services = [
  { n: "01", title: "Online Accounting", desc: "Cloud-based accounting anytime, anywhere.", icon: Cloud },
  { n: "02", title: "Accountancy", desc: "Bookkeeping, payroll and annual accounts.", icon: Calculator },
  { n: "03", title: "Self Assessment", desc: "Accurate personal tax returns filed on time.", icon: FileText },
  { n: "04", title: "Growth Advisory", desc: "Forecasting and advisory for ambitious teams.", icon: TrendingUp },
  { n: "05", title: "Small Business", desc: "Practical support for startups & SMEs.", icon: Briefcase },
  { n: "06", title: "Corporation Tax", desc: "Efficient CT planning & compliance.", icon: Building2 },
  { n: "07", title: "VAT Services", desc: "Registration, returns and MTD-ready.", icon: PoundSterling },
  { n: "08", title: "Company Restorations", desc: "Dissolved company recovery, end-to-end.", icon: Shield },
];

function FeaturedServices() {
  return (
    <Section>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <SectionHeading eyebrow="Featured Services" title={<>Comprehensive solutions for every <span className="text-gradient">stage of growth</span></>} subtitle="Tailored accounting, taxation and advisory to keep your business compliant, organised and ready to scale." />
        <Link to="/services" className="hidden lg:inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-semibold">All services <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.04 }}
            whileHover={{ y: -8 }}
            className="group relative rounded-3xl p-6 bg-white shadow-[0_6px_30px_-12px_rgba(11,31,58,0.15)] hover:shadow-[0_20px_60px_-20px_rgba(29,78,216,0.35)] transition overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 group-hover:opacity-100 transition duration-500" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.35), transparent 70%)" }} />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-muted-foreground">{s.n}</div>
                <div className="h-11 w-11 rounded-2xl bg-[color:var(--navy)] text-white flex items-center justify-center group-hover:gradient-brand transition">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-8 font-semibold text-lg">{s.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.desc}</div>
              <Link to="/services" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--royal)] group-hover:gap-2 transition">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- HOW WE WORK ---------------- */
function HowWeWork() {
  const steps = [
    { n: "01", title: "Free Consultation", desc: "We listen and understand your business goals." },
    { n: "02", title: "Plan", desc: "A tailored roadmap with clear pricing and outcomes." },
    { n: "03", title: "Implementation", desc: "We onboard, migrate and optimise your finances." },
    { n: "04", title: "Ongoing Support", desc: "Proactive advice all year — not just at year end." },
  ];
  return (
    <Section>
      <SectionHeading eyebrow="How We Work" title={<>Four steps to <span className="text-gradient">stress-free finances</span></>} subtitle="A simple, transparent process built for modern teams." />
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div key={s.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative rounded-3xl p-6 glass">
            <div className="text-5xl font-display font-bold text-gradient">{s.n}</div>
            <div className="mt-4 font-semibold text-lg">{s.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.desc}</div>
            {i < steps.length - 1 && <div className="hidden lg:block absolute top-10 -right-3 text-muted-foreground/40"><ArrowRight className="h-5 w-5" /></div>}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- INDUSTRIES ---------------- */
function Industries() {
  const items = [
    { icon: Hammer, label: "Construction" }, { icon: Stethoscope, label: "Healthcare" },
    { icon: ShoppingBag, label: "Retail" }, { icon: UtensilsCrossed, label: "Hospitality" },
    { icon: Briefcase, label: "Consultants" }, { icon: UserRound, label: "Freelancers" },
    { icon: Users, label: "Contractors" }, { icon: HomeIcon, label: "Property Investors" },
    { icon: Package, label: "Ecommerce" }, { icon: Building2, label: "Limited Companies" },
  ];
  return (
    <Section>
      <SectionHeading eyebrow="Industries We Serve" title={<>Sector expertise <span className="text-gradient">across the UK</span></>} />
      <div className="mt-14 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((it, i) => (
          <motion.div key={it.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} whileHover={{ y: -4 }} className="rounded-2xl glass p-5 flex flex-col items-center text-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-[color:var(--navy)] text-white flex items-center justify-center">
              <it.icon className="h-5 w-5" />
            </div>
            <div className="text-sm font-semibold">{it.label}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
type Review = { _id: string; name: string; role: string; quote: string; rating: number };

function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", quote: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/reviews", { signal: controller.signal })
      .then(r => {
        if (!r.ok) throw new Error("not ok");
        return r.json();
      })
      .then(data => {
        if (Array.isArray(data)) setReviews(data);
      })
      .catch(err => {
        if (err.name !== "AbortError") setFetchError(true);
      });
    return () => controller.abort();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setShowForm(false);
    } catch {}
    setLoading(false);
  };

  return (
    <Section>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <SectionHeading eyebrow="Client Reviews" title={<>What our clients <span className="text-gradient">say</span></>} />
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold hover:-translate-y-0.5 transition shrink-0"
        >
          <Star className="h-4 w-4 text-[color:var(--emerald)]" />
          {showForm ? "Cancel" : "Add a Review"}
        </button>
      </div>

      {/* Review form */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          onSubmit={submit}
          className="mt-8 glass rounded-3xl p-8 grid sm:grid-cols-2 gap-4"
        >
          <div>
            <label className="text-sm font-medium">Your Name *</label>
            <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[color:var(--royal)]/30"
              placeholder="Jane Smith" />
          </div>
          <div>
            <label className="text-sm font-medium">Your Role / Company</label>
            <input value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[color:var(--royal)]/30"
              placeholder="Director, Acme Ltd" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Your Review *</label>
            <textarea required rows={3} value={form.quote} onChange={e => setForm(p => ({ ...p, quote: e.target.value }))}
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-[color:var(--royal)]/30"
              placeholder="Share your experience with Proper Accounting Ltd…" />
          </div>
          <div>
            <label className="text-sm font-medium">Rating</label>
            <div className="flex gap-2 mt-2">
              {[1,2,3,4,5].map(n => (
                <button type="button" key={n} onClick={() => setForm(p => ({ ...p, rating: n }))}>
                  <Star className={`h-6 w-6 transition ${n <= form.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300 fill-slate-200"}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2 flex items-center gap-3">
            <button type="submit" disabled={loading}
              className="rounded-full gradient-brand text-white px-6 py-3 text-sm font-semibold disabled:opacity-60 transition hover:-translate-y-0.5">
              {loading ? "Submitting…" : "Submit Review"}
            </button>
            <p className="text-xs text-muted-foreground">Your review will be published after approval.</p>
          </div>
        </motion.form>
      )}

      {submitted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mt-6 rounded-2xl bg-green-50 border border-green-200 px-6 py-4 text-sm text-green-700 font-medium">
          ✓ Thank you! Your review has been submitted and will appear after approval.
        </motion.div>
      )}

      {fetchError ? null : reviews.length === 0 ? (
        <div className="mt-14 text-center text-muted-foreground text-sm py-12 glass rounded-3xl">
          No reviews yet — be the first to leave one.
        </div>
      ) : (
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((t, i) => (
            <motion.div key={t._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-3xl p-6 bg-white shadow-[0_6px_30px_-12px_rgba(11,31,58,0.15)]">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={`h-4 w-4 ${j < t.rating ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"}`} />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full gradient-brand text-white flex items-center justify-center font-semibold">{t.name[0]}</div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
}

/* ---------------- LATEST UPDATES ---------------- */
function LatestUpdates() {
  const posts = [
    { cat: "Making Tax Digital", title: "MTD for Income Tax: What sole traders need to know in 2026", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80" },
    { cat: "Corporation Tax", title: "Marginal relief explained: reducing your CT bill", img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80" },
    { cat: "VAT", title: "VAT thresholds updated — should you register?", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80" },
  ];
  return (
    <Section>
      <SectionHeading eyebrow="Tax Updates" title={<>Fresh insights from <span className="text-gradient">our experts</span></>} />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {posts.map((p, i) => (
          <motion.article key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group rounded-3xl overflow-hidden bg-white shadow-[0_6px_30px_-12px_rgba(11,31,58,0.15)]">
            <div className="relative overflow-hidden">
              <img src={p.img} alt="" className="w-full h-52 object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--royal)]">{p.cat}</div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg leading-tight">{p.title}</h3>
              <Link to="/tax-updates" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--royal)]">Read more <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "How much do your services cost?", a: "We offer fixed monthly plans starting from £45/month. Every quote is transparent, with no surprise fees." },
    { q: "Can you switch me over from my current accountant?", a: "Absolutely. We handle the entire switch — professional clearance, data migration and onboarding — in under 7 days." },
    { q: "Do you work with clients outside Manchester?", a: "Yes. We serve clients across the entire United Kingdom via our secure cloud accounting platform." },
    { q: "Which accounting software do you support?", a: "We're certified partners with Xero, QuickBooks, FreeAgent and Sage." },
    { q: "Is my data secure?", a: "Yes. We use bank-grade encryption, MFA and ISO-aligned processes for every document." },
  ];
  return (
    <Section>
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" center />
      <div className="mx-auto max-w-3xl mt-12 space-y-3">
        {faqs.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
              <span className="font-semibold">{f.q}</span>
              <motion.span animate={{ rotate: open === i ? 180 : 0 }}><ChevronDown className="h-5 w-5 text-muted-foreground" /></motion.span>
            </button>
            <motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }} className="overflow-hidden">
              <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- NEWSLETTER ---------------- */
function Newsletter() {
  return (
    <Section>
      <div className="relative rounded-[32px] overflow-hidden p-10 sm:p-16 gradient-brand text-white text-center">
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="relative max-w-2xl mx-auto">
          <Eyebrow>Newsletter</Eyebrow>
          <h2 className="mt-5 text-4xl sm:text-5xl font-bold">Tax tips, straight to your inbox.</h2>
          <p className="mt-4 text-white/80">Monthly insights on UK tax, HMRC updates and business growth.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="you@company.co.uk" className="flex-1 rounded-full px-5 py-3.5 text-foreground focus:outline-none focus:ring-4 ring-white/30" />
            <button className="rounded-full bg-[color:var(--navy)] px-6 py-3.5 font-semibold hover:-translate-y-0.5 transition">Subscribe</button>
          </form>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- PROUD PARTNERSHIPS ---------------- */
const partners = [
  {
    name: "Institute of Financial Accountants",
    logo: "/images/1.png",
    fallback: "IFA",
    url: "https://www.ifa.org.uk",
  },
  {
    name: "Xero",
    logo: "/images/2.png",
    fallback: "Xero",
    url: "https://www.xero.com",
  },
  {
    name: "Moneysoft",
    logo: "/images/3.png",
    fallback: "Moneysoft",
    url: "https://www.moneysoft.co.uk",
  },
  {
    name: "QuickBooks",
    logo: "/images/4.png",
    fallback: "QuickBooks",
    url: "https://quickbooks.intuit.com",
  },
  {
    name: "AccountancyManager",
    logo: "/images/5.jpg",
    fallback: "AM",
    url: "https://www.accountancymanager.co.uk",
  },
];

function ProudPartnerships() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Proud Partnerships"
        title={<>Trusted by the tools that <span className="text-gradient">power UK accounting</span></>}
        subtitle="We partner with industry-leading platforms to deliver seamless, modern accounting for every client."
        center
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-14 flex flex-wrap items-center justify-center gap-6"
      >
        {partners.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4, scale: 1.03 }}
            className="group flex items-center justify-center rounded-2xl bg-white shadow-[0_4px_20px_-6px_rgba(11,31,58,0.12)] hover:shadow-[0_8px_30px_-6px_rgba(29,78,216,0.2)] transition-all duration-300 p-5"
            style={{ width: 160, height: 90 }}
            title={p.name}
          >
            <img
              src={p.logo}
              alt={p.name}
              className="max-h-12 max-w-[120px] w-auto object-contain"
            />
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}
