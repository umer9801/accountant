import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Cloud, Calculator, FileText, TrendingUp, Briefcase, Building2, PoundSterling, Shield, CheckCircle2 } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/site/primitives";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Accountant Manchester" },
      { name: "description", content: "Comprehensive accounting, tax and advisory services for UK businesses." },
      { property: "og:title", content: "Services — Accountant Manchester" },
      { property: "og:description", content: "Cloud accounting, tax, payroll, VAT and business advisory." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Cloud, title: "Online Accounting", desc: "Work with your accountant anytime, anywhere through secure cloud-based accounting solutions.", body: "Manage invoices, expenses, payroll, reports and financial records online with real-time access to your business finances.", features: ["Cloud Accounting", "Real-Time Reporting", "Digital Document Storage", "Unlimited Support", "Mobile Access"] },
  { icon: Calculator, title: "Accountancy", desc: "Professional accountancy services tailored for UK businesses.", body: "From bookkeeping and annual accounts to payroll and financial reporting — we ensure compliance and clarity.", features: ["Bookkeeping", "Payroll", "Annual Accounts", "Financial Statements", "Business Advice"] },
  { icon: FileText, title: "Self Assessment", desc: "Complete your Self Assessment tax return accurately and on time.", body: "For freelancers, directors, landlords, contractors and self-employed individuals — we identify every relief.", features: ["HMRC Filing", "Tax Planning", "Income Reporting", "Capital Gains", "Rental Income"] },
  { icon: TrendingUp, title: "Growth Advisory", desc: "Helping ambitious businesses scale confidently.", body: "Strategic advice, forecasting, budgeting and growth planning to boost profitability and prepare for scale.", features: ["Business Strategy", "Forecasting", "Cash Flow Planning", "Profit Analysis", "Growth Consulting"] },
  { icon: Briefcase, title: "Small Business", desc: "Affordable accounting for small businesses and startups.", body: "Practical financial support that grows alongside your business — from day one.", features: ["Startup Support", "Bookkeeping", "Payroll", "Company Formation", "Tax Advice"] },
  { icon: Building2, title: "Corporation Tax", desc: "Efficient corporation tax planning and compliance.", body: "We calculate, prepare and submit CT returns while identifying legitimate opportunities to reduce liabilities.", features: ["Corporation Tax Returns", "Tax Planning", "HMRC Compliance", "Financial Reviews", "Deadline Management"] },
  { icon: PoundSterling, title: "VAT Services", desc: "Comprehensive VAT services for UK businesses.", body: "VAT registration, returns, planning, compliance and ongoing MTD-ready support.", features: ["VAT Registration", "VAT Returns", "VAT Planning", "Making Tax Digital", "HMRC Support"] },
  { icon: Shield, title: "Company Restorations", desc: "Restore a dissolved company back to active trading.", body: "Our specialists guide you through the restoration process — from documentation to Companies House liaison.", features: ["Company Restoration", "Companies House Support", "Legal Documentation", "Compliance", "Business Reactivation"] },
];

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={<>Comprehensive accounting for every <span className="text-gradient">stage of business</span></>}
        subtitle="From startups to established companies — tailored accounting, taxation and advisory services designed to keep your business compliant, financially organised and ready for growth."
        image="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80"
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl p-8 bg-white shadow-[0_6px_30px_-12px_rgba(11,31,58,0.15)] hover:shadow-[0_20px_60px_-20px_rgba(29,78,216,0.35)] transition overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-0 group-hover:opacity-100 transition duration-500" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.35), transparent 70%)" }} />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground">0{i + 1}</div>
                    <h3 className="mt-2 text-2xl font-bold">{s.title}</h3>
                  </div>
                  <div className="h-14 w-14 shrink-0 rounded-2xl gradient-brand flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition">
                    <s.icon className="h-6 w-6" />
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">{s.desc}</p>
                <p className="mt-2 text-sm text-muted-foreground/80">{s.body}</p>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {s.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[color:var(--emerald)]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold hover:gap-3 transition">
                  Enquire about this service <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
