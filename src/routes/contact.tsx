import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, ChevronDown } from "lucide-react";
import { PageHero, Section, SectionHeading, Eyebrow } from "@/components/site/primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Proper Accounting Ltd" },
      { name: "description", content: "Get in touch with Proper Accounting Ltd. Book a free consultation today." },
      { property: "og:title", content: "Contact Proper Accounting Ltd" },
      { property: "og:description", content: "Phone, email, WhatsApp or office visit — we're here to help." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let's talk about your <span className="text-gradient">finances</span></>}
        subtitle="Book a free consultation, ask a question or drop by our Manchester office. We reply within one business day."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
      />

      <Section>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10">
          <ContactForm />
          <ContactSidebar />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Location" title={<>Visit our <span className="text-gradient">Manchester office</span></>} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
          <iframe
            title="Map"
            className="w-full h-[420px] border-0"
            src="https://www.google.com/maps?q=Bartle+House+9+Oxford+Court+Manchester+M2+3WQ&output=embed"
            loading="lazy"
          />
        </motion.div>
      </Section>

      <FAQ />
    </>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", service: "Online Accounting", message: ""
  });

  const update = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      onSubmit={submit}
      className="rounded-3xl glass p-8 space-y-5"
    >
      <Eyebrow>Send us a message</Eyebrow>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" placeholder="Jane Smith" value={form.name} onChange={e => update("name", e.target.value)} required />
        <Field label="Email" type="email" placeholder="jane@company.co.uk" value={form.email} onChange={e => update("email", e.target.value)} required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Phone" placeholder="+44 …" value={form.phone} onChange={e => update("phone", e.target.value)} />
        <Field label="Company" placeholder="Acme Ltd" value={form.company} onChange={e => update("company", e.target.value)} />
      </div>
      <div>
        <label className="text-sm font-medium">Service of interest</label>
        <select
          value={form.service}
          onChange={e => update("service", e.target.value)}
          className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 outline-none"
        >
          <option>Online Accounting</option>
          <option>Self Assessment</option>
          <option>VAT Services</option>
          <option>Corporation Tax</option>
          <option>Payroll</option>
          <option>Company Restoration</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">Message</label>
        <textarea
          rows={5}
          placeholder="Tell us a bit about your business…"
          value={form.message}
          onChange={e => update("message", e.target.value)}
          required
          className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 outline-none resize-none"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading || sent}
        className="w-full rounded-full gradient-brand px-6 py-3.5 text-white font-semibold flex items-center justify-center gap-2 hover:-translate-y-0.5 transition disabled:opacity-70"
      >
        {sent ? "Message sent — we'll be in touch ✓" : loading ? "Sending…" : (<><Send className="h-4 w-4" /> Send message</>)}
      </button>
    </motion.form>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input {...props} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 outline-none focus:ring-2 focus:ring-[color:var(--royal)]/40" />
    </div>
  );
}

function ContactSidebar() {
  const items = [
    { icon: Phone, label: "Call us", value: "01617063550", href: "tel:+441617063550" },
    { icon: Mail, label: "Email us", value: "info@properaccounting.co.uk", href: "mailto:info@properaccounting.co.uk" },
    { icon: MapPin, label: "Office", value: "Bartle House, 9 Oxford Court, Manchester, M2 3WQ", href: "https://maps.google.com/?q=Bartle+House+9+Oxford+Court+Manchester+M2+3WQ" },
  ];
  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <motion.a key={it.label} href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-3xl glass p-6 flex items-start gap-4 hover:ring-2 hover:ring-[color:var(--royal)]/30 transition">
          <div className="h-12 w-12 rounded-2xl gradient-brand flex items-center justify-center text-white shrink-0"><it.icon className="h-5 w-5" /></div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{it.label}</div>
            <div className="mt-1 font-semibold text-sm leading-snug">{it.value}</div>
          </div>
        </motion.a>
      ))}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl bg-[color:var(--navy)] text-white p-6">
        <div className="flex items-center gap-2 font-semibold"><Clock className="h-4 w-4 text-[color:var(--emerald)]" /> Office hours</div>
        <ul className="mt-4 text-sm space-y-2 text-white/80">
          <li className="flex justify-between"><span>Monday – Friday</span><span>9:00 – 18:00</span></li>
          <li className="flex justify-between"><span>Saturday</span><span>10:00 – 14:00</span></li>
          <li className="flex justify-between"><span>Sunday</span><span>Closed</span></li>
        </ul>
      </motion.div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "How quickly do you respond?", a: "Within one business day — usually the same day for existing clients." },
    { q: "Do you offer in-person meetings?", a: "Yes, at our Manchester office or via secure video call." },
    { q: "What information should I bring to a consultation?", a: "Your latest accounts, current accountant details (if any), and a brief on your goals." },
  ];
  return (
    <Section>
      <SectionHeading eyebrow="FAQ" title="Questions before you reach out" center />
      <div className="mx-auto max-w-3xl mt-10 space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="glass rounded-2xl overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
              <span className="font-semibold">{f.q}</span>
              <motion.span animate={{ rotate: open === i ? 180 : 0 }}><ChevronDown className="h-5 w-5 text-muted-foreground" /></motion.span>
            </button>
            <motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }} className="overflow-hidden">
              <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
            </motion.div>
          </div>
        ))}
      </div>
    </Section>
  );
}
