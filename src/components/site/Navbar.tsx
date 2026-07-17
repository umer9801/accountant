import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Phone, Mail } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/tax-calculator", label: "Tax Calculator" },
  { to: "/tax-updates", label: "Tax Updates" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-3 transition-all duration-500 ${scrolled ? "glass" : "bg-transparent"}`}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl gradient-brand flex items-center justify-center text-white font-bold text-sm shadow-lg">A</div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold leading-tight">Proper Accounting Ltd</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Manchester · UK</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((l) => {
                const active = pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${active ? "text-[color:var(--royal)]" : "text-foreground/80 hover:text-foreground"}`}
                  >
                    {active && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/70 shadow-sm" />
                    )}
                    <span className="relative">{l.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-2">
              <Link
                to="/contact"
                className="hidden sm:inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition"
              >
                Book Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden h-10 w-10 rounded-full glass flex items-center justify-center"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile side drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer panel — slides in from right */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[300px] sm:w-[340px] bg-[color:var(--navy)] flex flex-col lg:hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl gradient-brand flex items-center justify-center text-white font-bold text-sm">A</div>
                  <div>
                    <div className="text-sm font-bold text-white leading-tight">Proper Accounting Ltd</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/50">Manchester · UK</div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-6 overflow-y-auto">
                {links.map((l, i) => {
                  const active = pathname === l.to;
                  return (
                    <motion.div
                      key={l.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={l.to}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-2xl mb-1 text-sm font-semibold transition-all ${
                          active
                            ? "gradient-brand text-white shadow-lg"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {l.label}
                        {active && <ArrowRight className="h-4 w-4" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer area */}
              <div className="px-4 pb-6 space-y-3 border-t border-white/10 pt-4">
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 rounded-full gradient-brand px-6 py-3.5 text-white font-semibold text-sm hover:-translate-y-0.5 transition shadow-lg"
                >
                  Book Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="flex items-center gap-3 px-2 pt-2">
                  <a href="tel:07774999123" className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition">
                    <Phone className="h-3.5 w-3.5" /> 07774999123
                  </a>
                </div>
                <div className="flex items-center gap-3 px-2">
                  <a href="mailto:info@properaccounting.co.uk" className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition">
                    <Mail className="h-3.5 w-3.5" /> info@properaccounting.co.uk
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
