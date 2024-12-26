import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { bountyLevels, calculateBounty } from "@/lib/bounty";
import { Terminal, DollarSign, Edit2 } from "lucide-react";
import { useState } from "react";

interface BountyEstimateProps {
  score: number;
}

export function BountyEstimate({ score }: BountyEstimateProps) {
  const [levels, setLevels] = useState(bountyLevels);
  const [isEditing, setIsEditing] = useState(false);

  const currentLevel = levels.find(level => score >= level.minScore) || levels[levels.length - 1];
  const estimatedBounty = calculateBounty(score);

  const handleBaseAmountChange = (levelIndex: number, value: string) => {
    const newValue = parseInt(value) || 0;
    setLevels(prevLevels => 
      prevLevels.map((level, index) => 
        index === levelIndex 
          ? { ...level, baseAmount: newValue }
          : level
      )
    );
  };

  return (
    <Card className="p-6 border-green-500/20 bg-black/40 backdrop-blur-sm w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-500" />
          <h2 className="text-green-500 font-mono uppercase tracking-wider text-sm">
            Estimated Bounty
          </h2>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-green-500 hover:text-green-400 transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2 p-4 border border-green-500/20 rounded bg-black/30">
          <span className="font-mono text-4xl text-green-500">
            ${estimatedBounty}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2 text-xs font-mono">
          {levels.map((level, index) => (
            <div key={level.name} className="flex items-center justify-between p-2 border border-green-500/20 rounded">
              <span className={level.color}>{level.name}</span>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <span>Base:</span>
                  <Input
                    type="number"
                    value={level.baseAmount}
                    onChange={(e) => handleBaseAmountChange(index, e.target.value)}
                    className="w-24 h-6 text-xs bg-black/50 border-green-500/20"
                  />
                </div>
              ) : (
                <span>Base: ${level.baseAmount}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}