import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import CountUp from "react-countup";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Calculator, PoundSterling, Percent, Building2, Coins, Wallet } from "lucide-react";
import { Section, SectionHeading, Eyebrow, PageHero } from "@/components/site/primitives";

export const Route = createFileRoute("/tax-calculator")({
  head: () => ({
    meta: [
      { title: "UK Tax Calculator — Proper Accounting Ltd" },
      { name: "description", content: "Free UK income tax, NI, corporation tax, VAT and dividend calculators." },
      { property: "og:title", content: "UK Tax Calculator — Proper Accounting Ltd" },
      { property: "og:description", content: "Instant tax breakdowns for salary, dividends, corporation tax and more." },
    ],
  }),
  component: CalculatorPage,
});

type CalcKey = "income" | "salary" | "corp" | "vat" | "dividend" | "ni";

function CalculatorPage() {
  const [active, setActive] = useState<CalcKey>("income");
  const tabs: { key: CalcKey; label: string; icon: any }[] = [
    { key: "income", label: "Income Tax", icon: PoundSterling },
    { key: "salary", label: "Salary", icon: Wallet },
    { key: "corp", label: "Corporation Tax", icon: Building2 },
    { key: "vat", label: "VAT", icon: Percent },
    { key: "dividend", label: "Dividend", icon: Coins },
    { key: "ni", label: "National Insurance", icon: Calculator },
  ];
  return (
    <>
      <PageHero
        eyebrow="Tax Calculator"
        title={<>UK tax, calculated <span className="text-gradient">beautifully</span></>}
        subtitle="Six modern calculators for salary, dividends, corporation tax, VAT and more — powered by the latest 2025/26 HMRC rates."
        image="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80"
      />
      <Section>
        <div className="glass rounded-3xl p-2 flex flex-wrap gap-1 mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
                active === t.key ? "gradient-brand text-white shadow-lg" : "hover:bg-white/60"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>
        {active === "income" || active === "salary" ? <IncomeCalculator /> : null}
        {active === "corp" ? <CorpCalculator /> : null}
        {active === "vat" ? <VATCalculator /> : null}
        {active === "dividend" ? <DividendCalculator /> : null}
        {active === "ni" ? <NICalculator /> : null}
      </Section>
    </>
  );
}

function computeIncomeTax(income: number, pensionPct: number) {
  const pension = (income * pensionPct) / 100;
  const taxable = Math.max(0, income - pension);
  const personalAllowance = taxable > 100000 ? Math.max(0, 12570 - (taxable - 100000) / 2) : 12570;
  const afterPA = Math.max(0, taxable - personalAllowance);
  let incomeTax = 0;
  const basicBand = Math.min(afterPA, 37700);
  incomeTax += basicBand * 0.2;
  const higherBand = Math.min(Math.max(0, afterPA - 37700), 125140 - 37700 - personalAllowance);
  incomeTax += Math.max(0, higherBand) * 0.4;
  const additional = Math.max(0, afterPA - (125140 - personalAllowance));
  incomeTax += additional * 0.45;

  // NI (Class 1) 2024/25 approx: 8% on 12570-50270, 2% above
  let ni = 0;
  ni += Math.min(Math.max(0, income - 12570), 50270 - 12570) * 0.08;
  ni += Math.max(0, income - 50270) * 0.02;

  const takeHome = income - incomeTax - ni - pension;
  return { incomeTax, ni, pension, takeHome };
}

function InputRow({ label, value, onChange, prefix = "£", step = 1000 }: { label: string; value: number; onChange: (n: number) => void; prefix?: string; step?: number }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-2 flex items-center rounded-2xl border border-black/10 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[color:var(--royal)]/40">
        <span className="pl-4 text-muted-foreground">{prefix}</span>
        <input
          type="number"
          value={value}
          step={step}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-full px-3 py-3.5 outline-none bg-transparent"
        />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl font-bold text-gradient mt-1">£<CountUp end={value} duration={0.9} separator="," decimals={0} preserveValue /></div>
    </div>
  );
}

function ChartCard({ data }: { data: { name: string; value: number; color: string }[] }) {
  return (
    <div className="rounded-3xl glass p-6">
      <div className="text-sm font-semibold mb-2">Breakdown</div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={60} outerRadius={95} dataKey="value" paddingAngle={2}>
              {data.map((d, index) => <Cell key={`cell-${index}`} fill={d.color} />)}
            </Pie>
            <Tooltip 
              formatter={(v: any) => `£${Number(v).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2 text-xs"><span className="h-3 w-3 rounded-full" style={{ background: d.color }} /> {d.name}</div>
        ))}
      </div>
    </div>
  );
}

function IncomeCalculator() {
  const [income, setIncome] = useState(60000);
  const [pension, setPension] = useState(5);
  const r = useMemo(() => computeIncomeTax(income, pension), [income, pension]);
  const chart = [
    { name: "Take Home", value: r.takeHome, color: "#10B981" },
    { name: "Income Tax", value: r.incomeTax, color: "#1D4ED8" },
    { name: "National Insurance", value: r.ni, color: "#0B1F3A" },
    { name: "Pension", value: r.pension, color: "#94A3B8" },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-8">
      <div className="rounded-3xl glass p-8 space-y-5">
        <div><Eyebrow>2025/26 rates</Eyebrow></div>
        <InputRow label="Annual gross income" value={income} onChange={setIncome} />
        <div>
          <label className="text-sm font-medium">Pension contribution ({pension}%)</label>
          <input type="range" min={0} max={30} value={pension} onChange={(e) => setPension(+e.target.value)} className="w-full mt-3 accent-[color:var(--royal)]" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Take Home (yr)" value={r.takeHome} />
          <Stat label="Monthly" value={r.takeHome / 12} />
          <Stat label="Income Tax" value={r.incomeTax} />
          <Stat label="National Insurance" value={r.ni} />
        </div>
      </div>
      <ChartCard data={chart} />
    </motion.div>
  );
}

function CorpCalculator() {
  const [profit, setProfit] = useState(120000);
  const tax = useMemo(() => {
    if (profit <= 50000) return profit * 0.19;
    if (profit >= 250000) return profit * 0.25;
    // Marginal relief simplified
    const upper = profit * 0.25;
    const relief = (250000 - profit) * (3 / 200);
    return upper - relief;
  }, [profit]);
  const net = profit - tax;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-8">
      <div className="rounded-3xl glass p-8 space-y-5">
        <InputRow label="Annual profits" value={profit} onChange={setProfit} />
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Corporation Tax" value={tax} />
          <Stat label="Net Profit" value={net} />
        </div>
        <p className="text-xs text-muted-foreground">Small profits rate: 19% up to £50k · Main rate: 25% from £250k · Marginal relief between.</p>
      </div>
      <ChartCard data={[
        { name: "Net Profit", value: net, color: "#10B981" },
        { name: "Corporation Tax", value: tax, color: "#1D4ED8" },
      ]} />
    </motion.div>
  );
}

function VATCalculator() {
  const [amount, setAmount] = useState(1000);
  const [mode, setMode] = useState<"add" | "remove">("add");
  const rate = 0.2;
  const { net, vat, gross } = useMemo(() => {
    if (mode === "add") return { net: amount, vat: amount * rate, gross: amount * (1 + rate) };
    return { gross: amount, net: amount / (1 + rate), vat: amount - amount / (1 + rate) };
  }, [amount, mode]);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-8">
      <div className="rounded-3xl glass p-8 space-y-5">
        <div className="flex gap-2">
          <button onClick={() => setMode("add")} className={`flex-1 rounded-2xl py-2.5 text-sm font-semibold ${mode === "add" ? "gradient-brand text-white" : "bg-white"}`}>Add VAT</button>
          <button onClick={() => setMode("remove")} className={`flex-1 rounded-2xl py-2.5 text-sm font-semibold ${mode === "remove" ? "gradient-brand text-white" : "bg-white"}`}>Remove VAT</button>
        </div>
        <InputRow label={mode === "add" ? "Net amount" : "Gross amount"} value={amount} onChange={setAmount} step={100} />
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Net" value={net} /><Stat label="VAT (20%)" value={vat} /><Stat label="Gross" value={gross} />
        </div>
      </div>
      <ChartCard data={[
        { name: "Net", value: net, color: "#10B981" },
        { name: "VAT", value: vat, color: "#1D4ED8" },
      ]} />
    </motion.div>
  );
}

function DividendCalculator() {
  const [salary, setSalary] = useState(12570);
  const [dividend, setDividend] = useState(40000);
  const result = useMemo(() => {
    const allowance = 500; // dividend allowance
    const paLeft = Math.max(0, 12570 - salary);
    const taxableDiv = Math.max(0, dividend - paLeft - allowance);
    const total = salary + dividend;
    // Simplified bands
    let tax = 0;
    let remaining = taxableDiv;
    const basicSpace = Math.max(0, 50270 - Math.max(salary, 12570));
    const basicPortion = Math.min(remaining, basicSpace);
    tax += basicPortion * 0.0875;
    remaining -= basicPortion;
    const higherSpace = Math.max(0, 125140 - 50270);
    const higherPortion = Math.min(remaining, higherSpace);
    tax += higherPortion * 0.3375;
    remaining -= higherPortion;
    tax += remaining * 0.3935;
    return { tax, net: total - tax };
  }, [salary, dividend]);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-8">
      <div className="rounded-3xl glass p-8 space-y-5">
        <InputRow label="Salary" value={salary} onChange={setSalary} step={500} />
        <InputRow label="Dividend income" value={dividend} onChange={setDividend} step={1000} />
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Dividend Tax" value={result.tax} /><Stat label="Total Take Home" value={result.net} />
        </div>
      </div>
      <ChartCard data={[
        { name: "Take Home", value: result.net, color: "#10B981" },
        { name: "Dividend Tax", value: result.tax, color: "#1D4ED8" },
      ]} />
    </motion.div>
  );
}

function NICalculator() {
  const [income, setIncome] = useState(45000);
  const ni = useMemo(() => {
    let n = 0;
    n += Math.min(Math.max(0, income - 12570), 50270 - 12570) * 0.08;
    n += Math.max(0, income - 50270) * 0.02;
    return n;
  }, [income]);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-8">
      <div className="rounded-3xl glass p-8 space-y-5">
        <InputRow label="Annual income" value={income} onChange={setIncome} />
        <div className="grid grid-cols-2 gap-3">
          <Stat label="National Insurance (yr)" value={ni} />
          <Stat label="Monthly NI" value={ni / 12} />
        </div>
      </div>
      <ChartCard data={[
        { name: "Take Home (pre-tax)", value: income - ni, color: "#10B981" },
        { name: "National Insurance", value: ni, color: "#1D4ED8" },
      ]} />
    </motion.div>
  );
}
