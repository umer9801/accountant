import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import { PageHero, Section } from "@/components/site/primitives";

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
        image="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80"
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
    </>
  );
}
