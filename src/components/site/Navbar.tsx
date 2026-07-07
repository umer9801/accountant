import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

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

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass" : "bg-transparent"
          }`}>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl gradient-brand flex items-center justify-center text-white font-bold text-sm shadow-lg">A</div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold leading-tight">Accountant</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Manchester · UK</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {links.map((l) => {
                const active = pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      active ? "text-[color:var(--royal)]" : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/70 shadow-sm" />
                    )}
                    <span className="relative">{l.label}</span>
                  </Link>
                );
              })}
            </nav>

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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-[color:var(--navy)]/95 backdrop-blur-xl" />
            <div className="relative h-full flex flex-col p-6">
              <div className="flex justify-between items-center">
                <div className="h-10 w-10 rounded-xl gradient-brand flex items-center justify-center text-white font-bold">A</div>
                <button onClick={() => setOpen(false)} className="h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-16 flex flex-col gap-2">
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link to={l.to} className="block text-3xl font-display font-semibold text-white py-3 border-b border-white/10">
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto">
                <Link to="/contact" className="block text-center rounded-full gradient-brand px-6 py-4 text-white font-semibold">
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
