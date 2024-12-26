import { useState } from "react";
import { metrics } from "@/lib/cvss";
import { calculateCVSSScore } from "@/lib/cvss";
import { MetricCard } from "./metric-card";
import { ScoreDisplay } from "./score-display";
import { BountyEstimate } from "./bounty-estimate";
import { Skull, Terminal } from "lucide-react";

export function CVSSCalculator() {
  const [values, setValues] = useState({
    attackVector: 0.85,
    attackComplexity: 0.77,
    privilegesRequired: 0.85,
    userInteraction: 0.85,
    scope: 1.0,
    confidentiality: 0.56,
    integrity: 0.56,
    availability: 0.56,
  });

  const score = calculateCVSSScore(values);

  const handleChange = (metric: string, value: number) => {
    setValues((prev) => ({
      ...prev,
      [metric]: value,
    }));
  };

  return (
    <>
      <div className="scanline" />
      <div className="w-full p-6">
        <div className="text-center mb-8 space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-2">
            <Terminal className="w-8 h-8 text-green-500 animate-pulse" />
            <Skull className="w-8 h-8 text-green-500 animate-pulse" />
          </div>
          <h1 className="text-4xl font-mono font-bold text-green-500 animate-glow">
            CVSSv3 Calculator
          </h1>
          <div className="font-mono text-green-500/60 text-sm typewriter">
            [System] Analyzing vulnerability metrics...
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mx-auto mb-6">
          <div className="space-y-6">
            {Object.entries(metrics).slice(0, 4).map(([metric, options]) => (
              <MetricCard
                key={metric}
                title={metric.replace(/([A-Z])/g, " $1").trim()}
                options={options}
                value={values[metric as keyof typeof values]}
                onChange={(value) => handleChange(metric, value)}
              />
            ))}
          </div>
          <div className="space-y-6">
            {Object.entries(metrics).slice(4).map(([metric, options]) => (
              <MetricCard
                key={metric}
                title={metric.replace(/([A-Z])/g, " $1").trim()}
                options={options}
                value={values[metric as keyof typeof values]}
                onChange={(value) => handleChange(metric, value)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <ScoreDisplay score={score} metrics={values} />
          <BountyEstimate score={score} />
        </div>
      </div>
    </>
  );
}