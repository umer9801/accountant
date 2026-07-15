import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart, ShieldCheck, Clock, Users } from "lucide-react";
import { PageHero, Section, SectionHeading, Eyebrow } from "@/components/site/primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Accountant Manchester" },
      { name: "description", content: "Over 15 years of trusted accounting, tax and advisory services for UK businesses. ICAEW and ACCA regulated." },
      { property: "og:title", content: "About Accountant Manchester" },
      { property: "og:description", content: "Regulated UK accountants serving businesses across Manchester and the UK." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={<>Accountants you can <span className="text-gradient">rely on</span></>}
        subtitle="We are a Manchester-based accountancy practice with over 15 years of experience serving individuals, sole traders, limited companies and growing businesses across the United Kingdom."
        image="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80"
      />

      {/* Who we are */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Eyebrow>Who We Are</Eyebrow>
            <h2 className="mt-5 text-4xl font-bold leading-tight">
              A practice built on <span className="text-gradient">technical rigour</span> and long-term client relationships
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Accountant Manchester was established to address a clear gap in the market: businesses of all sizes needed access to the same quality of financial advice previously reserved for large corporate clients. We set out to change that.
              </p>
              <p>
                Our team comprises qualified accountants registered with ICAEW and ACCA, with backgrounds spanning public practice, corporate finance and HMRC compliance. Every engagement is handled by a senior qualified professional — not passed to junior staff.
              </p>
              <p>
                We work with clients across a broad range of sectors including property, professional services, healthcare, retail, construction and technology. Whether you are navigating your first year in business or managing a complex group structure, we apply the same standard of care.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: ShieldCheck, label: "ICAEW & ACCA Regulated", desc: "All work carried out under professional regulatory standards." },
              { icon: Clock, label: "15+ Years in Practice", desc: "Established experience across personal and corporate tax." },
              { icon: Users, label: "2,500+ Clients Served", desc: "Individuals, SMEs, landlords and limited companies." },
              { icon: Target, label: "Dedicated Accountant", desc: "One senior point of contact for your account at all times." },
            ].map((it, i) => (
              <motion.div
                key={it.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl glass p-5"
              >
                <div className="h-10 w-10 rounded-xl gradient-brand flex items-center justify-center text-white mb-3">
                  <it.icon className="h-4 w-4" />
                </div>
                <div className="font-semibold text-sm">{it.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{it.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Mission / Vision / Values */}
      <Section>
        <SectionHeading
          eyebrow="Our Principles"
          title={<>What guides <span className="text-gradient">our practice</span></>}
          subtitle="We hold ourselves to a clear standard — one that puts client outcomes above all else."
        />
        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: "Our Mission",
              body: "To provide accurate, timely and commercially relevant financial advice that helps our clients make informed decisions, reduce their tax burden and remain fully compliant with HMRC obligations.",
            },
            {
              icon: Eye,
              title: "Our Approach",
              body: "We do not believe in a one-size-fits-all model. Each client receives a tailored service plan based on their business structure, sector, and financial objectives. We ask questions before we provide answers.",
            },
            {
              icon: Heart,
              title: "Our Commitment",
              body: "Responsiveness, transparency and professional integrity are non-negotiable in our practice. We communicate clearly, meet deadlines, and provide honest advice — even when it is not what a client wants to hear.",
            },
          ].map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl p-8 glass"
            >
              <div className="h-12 w-12 rounded-2xl gradient-brand flex items-center justify-center text-white shadow-lg">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{it.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Why clients stay */}
      <Section>
        <div className="rounded-3xl bg-[color:var(--navy)] text-white p-10 sm:p-14">
          <div className="absolute inset-0 grid-bg opacity-10 rounded-3xl" />
          <div className="relative max-w-3xl">
            <Eyebrow>Client Retention</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl font-bold leading-snug">
              Why clients stay with us for years, not just one tax return
            </h2>
            <div className="mt-6 space-y-4 text-white/75 leading-relaxed">
              <p>
                The majority of our client relationships span multiple years. This is not by accident. We invest time in understanding each client's financial position from the outset, and we revisit that understanding regularly as their circumstances evolve.
              </p>
              <p>
                We proactively communicate changes in tax legislation, filing deadlines and planning opportunities — rather than waiting to be asked. Our clients tell us they value being treated as individuals, not as case numbers.
              </p>
            </div>
            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              {[
                { stat: "93%", label: "Client retention rate year on year" },
                { stat: "< 24h", label: "Average response time during business hours" },
                { stat: "100%", label: "Self assessment returns filed on time" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl bg-white/10 p-5"
                >
                  <div className="text-3xl font-bold text-gradient">{s.stat}</div>
                  <div className="mt-2 text-sm text-white/70">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
