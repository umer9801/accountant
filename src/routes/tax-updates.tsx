import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Calendar, ArrowRight, TrendingUp } from "lucide-react";
import { PageHero, Section, Eyebrow } from "@/components/site/primitives";

export const Route = createFileRoute("/tax-updates")({
  head: () => ({
    meta: [
      { title: "Tax Updates — Proper Accounting Ltd" },
      { name: "description", content: "Latest UK tax news, HMRC updates, VAT changes and Making Tax Digital insights." },
      { property: "og:title", content: "UK Tax Updates — Proper Accounting Ltd" },
      { property: "og:description", content: "Insights, guides and updates from our chartered accountants." },
    ],
  }),
  component: UpdatesPage,
});

const categories = ["All", "Income Tax", "Corporation Tax", "VAT", "HMRC", "Making Tax Digital", "Payroll", "National Insurance"];

const posts = [
  { title: "Autumn Budget 2025: what UK businesses need to know", cat: "HMRC", date: "12 Oct 2025", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80", featured: true, trending: true },
  { title: "MTD for Income Tax: sole trader readiness checklist", cat: "Making Tax Digital", date: "05 Oct 2025", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80", trending: true },
  { title: "Corporation tax marginal relief: worked examples", cat: "Corporation Tax", date: "28 Sep 2025", img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80" },
  { title: "VAT thresholds updated — should you register?", cat: "VAT", date: "20 Sep 2025", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80" },
  { title: "National Insurance changes for directors in 2025/26", cat: "National Insurance", date: "12 Sep 2025", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80" },
  { title: "Payroll RTI: avoiding the 5 most common mistakes", cat: "Payroll", date: "01 Sep 2025", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
  { title: "Self assessment: allowable expenses you're missing", cat: "Income Tax", date: "24 Aug 2025", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80" },
  { title: "HMRC compliance checks: what to expect in 2025", cat: "HMRC", date: "18 Aug 2025", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80" },
];

function UpdatesPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const filtered = posts.filter((p) => (cat === "All" || p.cat === cat) && p.title.toLowerCase().includes(q.toLowerCase()));
  const featured = posts.find((p) => p.featured)!;
  const trending = posts.filter((p) => p.trending);

  return (
    <>
      <PageHero
        eyebrow="Tax Updates"
        title={<>Insights & guides from <span className="text-gradient">our chartered team</span></>}
        subtitle="Stay ahead of HMRC changes, deadlines and opportunities. Expert-written, jargon-free."
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80"
      />

      <Section>
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          <div>
            {/* Featured */}
            <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-3xl overflow-hidden bg-white shadow-[0_10px_40px_-20px_rgba(11,31,58,0.35)] mb-10">
              <div className="grid md:grid-cols-2">
                <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto">
                  <img src={featured.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2"><Eyebrow>Featured</Eyebrow></div>
                  <h2 className="mt-5 text-3xl font-bold leading-tight">{featured.title}</h2>
                  <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="rounded-full bg-[color:var(--royal)]/10 text-[color:var(--royal)] px-3 py-1 font-semibold">{featured.cat}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {featured.date}</span>
                  </div>
                  <a className="mt-6 inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 text-white font-semibold text-sm w-fit">Read article <ArrowRight className="h-4 w-4" /></a>
                </div>
              </div>
            </motion.article>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="flex items-center rounded-full glass px-4 py-2 flex-1">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" className="ml-2 bg-transparent outline-none text-sm w-full" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${cat === c ? "gradient-brand text-white shadow" : "glass hover:bg-white"}`}>{c}</button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {filtered.map((p, i) => (
                <motion.article key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group rounded-3xl overflow-hidden bg-white shadow-[0_6px_30px_-12px_rgba(11,31,58,0.15)] hover:-translate-y-1 transition">
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img src={p.img} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                    <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--royal)]">{p.cat}</div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</div>
                    <h3 className="mt-2 font-semibold leading-snug">{p.title}</h3>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl glass p-6">
              <div className="flex items-center gap-2 font-semibold"><TrendingUp className="h-4 w-4 text-[color:var(--emerald)]" /> Trending</div>
              <ul className="mt-4 space-y-4">
                {trending.map((t, i) => (
                  <li key={t.title} className="flex gap-3">
                    <div className="text-2xl font-bold text-gradient">0{i + 1}</div>
                    <div className="text-sm font-medium leading-snug">{t.title}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl gradient-brand text-white p-6">
              <div className="font-semibold text-lg">Weekly Tax Digest</div>
              <p className="text-sm text-white/80 mt-1">Concise UK tax news, every Monday.</p>
              <form onSubmit={(e) => e.preventDefault()} className="mt-4 space-y-2">
                <input type="email" placeholder="you@company.co.uk" className="w-full rounded-full px-4 py-2.5 text-foreground text-sm" />
                <button className="w-full rounded-full bg-[color:var(--navy)] py-2.5 text-sm font-semibold">Subscribe</button>
              </form>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
