import { cn } from "@/lib/utils";

interface RadioCardsProps {
  options: { label: string; value: string; description?: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RadioCards({ options, value, onChange, className }: RadioCardsProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "relative flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
            "hover:border-green-500/50 hover:bg-green-500/5",
            "group focus-within:ring-2 focus-within:ring-green-500/50",
            value === option.value 
              ? "border-green-500 bg-green-500/10" 
              : "border-muted bg-black/40"
          )}
        >
          <input
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          <span className={cn(
            "font-mono text-sm transition-colors duration-200",
            value === option.value ? "text-green-500" : "text-muted-foreground",
            "group-hover:text-green-500"
          )}>
            {option.label}
          </span>
          {option.description && (
            <span className="text-xs text-muted-foreground mt-1 text-center">
              {option.description}
            </span>
          )}
          <div className={cn(
            "absolute inset-0 border-2 border-green-500/0 rounded-lg transition-all duration-200",
            value === option.value && "border-green-500/50 animate-pulse"
          )} />
        </label>
      ))}
    </div>
  );
}