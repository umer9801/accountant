import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, ChevronDown } from "lucide-react";
import { PageHero, Section, SectionHeading, Eyebrow } from "@/components/site/primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Accountant Manchester" },
      { name: "description", content: "Get in touch with Accountant Manchester. Book a free consultation today." },
      { property: "og:title", content: "Contact Accountant Manchester" },
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
        image="/__l5e/assets-v1/ce75d86c-4a86-4398-abd5-8d8a471ab29b/contact.jpg"
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
            src="https://www.google.com/maps?q=Manchester,UK&output=embed"
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
  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      className="rounded-3xl glass p-8 space-y-5"
    >
      <Eyebrow>Send us a message</Eyebrow>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" placeholder="Jane Smith" />
        <Field label="Email" type="email" placeholder="jane@company.co.uk" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Phone" placeholder="+44 …" />
        <Field label="Company" placeholder="Acme Ltd" />
      </div>
      <div>
        <label className="text-sm font-medium">Service of interest</label>
        <select className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 outline-none">
          <option>Online Accounting</option><option>Self Assessment</option><option>VAT Services</option>
          <option>Corporation Tax</option><option>Payroll</option><option>Company Restoration</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">Message</label>
        <textarea rows={5} placeholder="Tell us a bit about your business…" className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 outline-none resize-none" />
      </div>
      <button type="submit" className="w-full rounded-full gradient-brand px-6 py-3.5 text-white font-semibold flex items-center justify-center gap-2 hover:-translate-y-0.5 transition">
        {sent ? "Message sent — we'll be in touch" : (<><Send className="h-4 w-4" /> Send message</>)}
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
    { icon: Phone, label: "Call us", value: "+44 (0) 161 000 0000" },
    { icon: Mail, label: "Email us", value: "hello@accountant.uk" },
    { icon: MessageCircle, label: "WhatsApp", value: "+44 7000 000 000" },
    { icon: MapPin, label: "Office", value: "1 King Street, Manchester M2 6AW" },
  ];
  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <motion.div key={it.label} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-3xl glass p-6 flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl gradient-brand flex items-center justify-center text-white shrink-0"><it.icon className="h-5 w-5" /></div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{it.label}</div>
            <div className="mt-1 font-semibold">{it.value}</div>
          </div>
        </motion.div>
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
