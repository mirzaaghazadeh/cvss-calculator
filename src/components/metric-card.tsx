import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioCards } from "@/components/ui/radio-cards";
import { Terminal } from "lucide-react";

interface MetricCardProps {
  title: string;
  options: { label: string; value: number; description?: string }[];
  value: number;
  onChange: (value: number) => void;
}

export function MetricCard({ title, options, value, onChange }: MetricCardProps) {
  return (
    <Card className="p-4 border-green-500/20 bg-black/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="w-4 h-4 text-green-500" />
        <Label className="text-green-500 font-mono uppercase tracking-wider text-sm">
          {title}
        </Label>
      </div>
      <RadioCards
        options={options.map(opt => ({
          label: opt.label,
          value: opt.value.toString(),
          description: opt.description
        }))}
        value={value.toString()}
        onChange={(val) => onChange(Number(val))}
      />
    </Card>
  );
}