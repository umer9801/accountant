import { motion } from "framer-motion";
import { PoundSterling, Percent, Calculator, LineChart, Coins, FileText } from "lucide-react";

const icons = [PoundSterling, Percent, Calculator, LineChart, Coins, FileText];

export function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
    >
      <div className="relative flex flex-col items-center gap-8">
        <div className="relative h-40 w-40">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed"
            style={{ borderColor: "#1D4ED8" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-3 rounded-full gradient-brand flex items-center justify-center shadow-2xl">
            <span className="text-white font-display font-bold text-2xl tracking-tight">A</span>
          </div>
          {icons.map((Icon, i) => {
            const angle = (i / icons.length) * Math.PI * 2;
            const r = 96;
            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 h-9 w-9 -ml-4 -mt-4 rounded-full bg-white shadow-lg flex items-center justify-center text-[color:var(--royal)]"
                animate={{
                  x: Math.cos(angle) * r,
                  y: Math.sin(angle) * r,
                  rotate: 360,
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
              >
                <Icon className="h-4 w-4" />
              </motion.div>
            );
          })}
        </div>
        <div className="w-64 h-1 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-brand"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
        </div>
        <p className="text-sm text-muted-foreground font-medium">Preparing Your Financial Dashboard…</p>
      </div>
    </motion.div>
  );
}
