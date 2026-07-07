import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Award, CheckCircle2 } from "lucide-react";
import { PageHero, Section, SectionHeading, Eyebrow } from "@/components/site/primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Accountant Manchester" },
      { name: "description", content: "Helping UK businesses grow with confidence. Meet the team behind Accountant Manchester." },
      { property: "og:title", content: "About Accountant Manchester" },
      { property: "og:description", content: "Modern accounting for modern UK businesses." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>Helping UK businesses grow with <span className="text-gradient">confidence</span></>}
        subtitle="We combine years of accounting expertise with modern digital technology to deliver reliable financial solutions for businesses throughout the UK."
        image="/__l5e/assets-v1/bbae8ff9-2019-4f8f-a794-91ed13c7c165/about.jpg"
      />

      <Section>
        <div className="grid lg:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "Our Mission", body: "To remove the complexity of accounting while helping clients make smarter financial decisions." },
            { icon: Eye, title: "Our Vision", body: "To be the UK's most trusted digital-first accountancy for ambitious founders." },
            { icon: Heart, title: "Our Values", body: "Integrity, transparency, curiosity and genuine partnership with every client we serve." },
          ].map((it, i) => (
            <motion.div key={it.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-3xl p-8 glass">
              <div className="h-12 w-12 rounded-2xl gradient-brand flex items-center justify-center text-white shadow-lg"><it.icon className="h-5 w-5" /></div>
              <h3 className="mt-5 text-xl font-bold">{it.title}</h3>
              <p className="mt-2 text-muted-foreground">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Our Journey" title={<>A timeline of <span className="text-gradient">growth</span></>} />
        <div className="mt-14 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[color:var(--royal)] to-[color:var(--emerald)]" />
          {[
            { y: "2009", t: "Founded in Manchester", d: "Started with a single client and a big vision." },
            { y: "2014", t: "First 500 clients", d: "Reached our first major milestone across the UK." },
            { y: "2019", t: "Cloud-first transformation", d: "Migrated our entire practice to real-time cloud accounting." },
            { y: "2023", t: "Awarded UK Top 100 Firm", d: "Recognised for innovation and client outcomes." },
            { y: "2025", t: "2,500+ businesses trust us", d: "And we're just getting started." },
          ].map((s, i) => (
            <motion.div key={s.y} initial={{ opacity: 0, x: i % 2 ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`relative flex mb-10 ${i % 2 ? "md:flex-row-reverse" : ""}`}>
              <div className="w-full md:w-1/2 pl-12 md:px-8">
                <div className="glass rounded-3xl p-6">
                  <div className="text-sm font-bold text-[color:var(--royal)]">{s.y}</div>
                  <div className="mt-2 font-semibold text-lg">{s.t}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.d}</div>
                </div>
              </div>
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 h-4 w-4 rounded-full gradient-brand ring-4 ring-white" />
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Meet the team" title={<>The people behind <span className="text-gradient">Accountant Manchester</span></>} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Sadia Khan", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80" },
            { name: "James O'Brien", role: "Head of Tax", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80" },
            { name: "Priya Sharma", role: "Senior Accountant", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80" },
            { name: "Michael Turner", role: "Client Advisor", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80" },
          ].map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="group rounded-3xl overflow-hidden bg-white shadow-[0_6px_30px_-12px_rgba(11,31,58,0.15)]">
              <div className="relative overflow-hidden aspect-[4/5]">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-5">
                <div className="font-semibold">{m.name}</div>
                <div className="text-sm text-muted-foreground">{m.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl glass p-10">
          <Eyebrow>Certifications & Awards</Eyebrow>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {["ACCA Certified", "ICAEW Member", "Xero Platinum Partner", "UK Top 100 Firm 2023"].map((c, i) => (
              <motion.div key={c} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3">
                <Award className="h-8 w-8 text-[color:var(--emerald)]" />
                <div className="font-semibold text-sm">{c}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
