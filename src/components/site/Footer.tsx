import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowRight } from "lucide-react";

const PHONE = "+447774999123";
const WHATSAPP = "447774999123";
const ADDRESS = "Bartle House, 9 Oxford Court, Manchester, England, M2 3WQ";
const MAP_URL = "https://maps.google.com/?q=Bartle+House+9+Oxford+Court+Manchester+M2+3WQ";

export function Footer() {
  return (
    <footer className="relative mt-32 bg-[color:var(--navy)] text-white overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute -top-32 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-[color:var(--royal)]/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark rounded-3xl p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold">Ready to simplify your finances?</h3>
            <p className="text-white/70 mt-2">Book a free consultation — no commitments, just clarity.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white text-[color:var(--navy)] px-6 py-3 font-semibold hover:gap-3 transition-all">
            Book Consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl overflow-hidden bg-white flex items-center justify-center">
                <img src="/logo.png" alt="Proper Accounting Ltd" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <div className="font-bold">Proper Accounting Ltd</div>
                <div className="text-xs text-white/60 uppercase tracking-widest">Manchester · UK</div>
              </div>
            </div>
            <p className="mt-4 text-white/70 max-w-md leading-relaxed">
              Accounting, taxation and advisory services for individuals, contractors, SMEs and businesses across the United Kingdom.
            </p>
            <div className="flex gap-3 mt-6">
              {[Linkedin, Twitter, Facebook].map((I, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold mb-4">Quick Links</div>
            <ul className="space-y-2 text-white/70 text-sm">
              {[["/", "Home"], ["/about", "About"], ["/services", "Services"], ["/tax-calculator", "Tax Calculator"], ["/tax-updates", "Tax Updates"], ["/contact", "Contact"]].map(([to, l]) => (
                <li key={to}><Link to={to} className="hover:text-white transition">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-4">Get in touch</div>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[color:var(--emerald)]" />
                <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition leading-snug">
                  {ADDRESS}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-[color:var(--emerald)]" />
                <div className="flex flex-col gap-1">
                  <a href={`tel:${PHONE}`} className="hover:text-white transition">{PHONE}</a>
                  <a href="tel:+441617063550" className="hover:text-white transition">+441617063550</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-[color:var(--emerald)]" />
                <a href="mailto:info@properaccounting.co.uk" className="hover:text-white transition">info@properaccounting.co.uk</a>
              </li>
              <li className="text-xs mt-4 text-white/50">Mon–Fri · 9:00 – 18:00 GMT</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Proper Accounting Ltd. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
