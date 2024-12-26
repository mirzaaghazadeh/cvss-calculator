import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getSeverityLevel } from "@/lib/cvss";
import { generateVector } from "@/lib/cvss-vector";
import { SeverityEmoji } from "./severity-emoji";
import { BountyEstimate } from "./bounty-estimate";
import { Terminal, Copy } from "lucide-react";
import { useState } from "react";

interface ScoreDisplayProps {
  score: number;
  metrics: Record<string, number>;
}

export function ScoreDisplay({ score, metrics }: ScoreDisplayProps) {
  const [copied, setCopied] = useState(false);
  const severity = getSeverityLevel(score);
  const vector = generateVector(metrics);

  const copyVector = async () => {
    await navigator.clipboard.writeText(vector);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border-green-500/20 bg-black/40 backdrop-blur-sm w-full">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-4 h-4 text-green-500" />
          <h2 className="text-green-500 font-mono uppercase tracking-wider text-sm">
            Vulnerability Analysis
          </h2>
        </div>

        <div className="space-y-6">
          <div className="text-center p-4 bg-black/60 rounded-lg border border-green-500/20">
            <div className="font-mono text-6xl font-bold text-green-500 tabular-nums animate-glow">
              {score.toFixed(1)}
            </div>
            <SeverityEmoji score={score} className="mt-2" />
          </div>

          <div className={cn(
            "text-2xl font-mono text-center p-3 rounded-lg border animate-pulse",
            {
              "border-red-500/50 text-red-500": severity.color === "destructive",
              "border-orange-500/50 text-orange-500": severity.color === "orange-500",
              "border-yellow-500/50 text-yellow-500": severity.color === "yellow-500",
              "border-green-500/50 text-green-500": severity.color === "green-500",
              "border-gray-500/50 text-gray-500": severity.color === "gray-500",
            }
          )}>
            {severity.level}
          </div>

          <div 
            className="p-3 bg-black/30 rounded-lg border border-green-500/20 font-mono text-sm cursor-pointer group relative"
            onClick={copyVector}
          >
            <div className="flex items-center justify-between">
              <span className="text-green-500/60">Vector String:</span>
              <Copy className={cn(
                "w-4 h-4 transition-colors",
                copied ? "text-green-500" : "text-green-500/60"
              )} />
            </div>
            <div className="mt-1 text-green-500 break-all">
              {vector}
            </div>
            <span className={cn(
              "absolute right-2 top-2 text-xs text-green-500 transition-opacity",
              copied ? "opacity-100" : "opacity-0"
            )}>
              Copied!
            </span>
          </div>
        </div>
      </Card>
      
      <BountyEstimate score={score} />
    </div>
  );
}