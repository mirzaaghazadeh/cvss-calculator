import { cn } from "@/lib/utils";

type SeverityEmojiProps = {
  score: number;
  className?: string;
};

export function SeverityEmoji({ score, className }: SeverityEmojiProps) {
  const getEmoji = () => {
    if (score >= 9.0) return "🔥";
    if (score >= 7.0) return "⚠️";
    if (score >= 4.0) return "😟";
    if (score > 0.0) return "😅";
    return "😴";
  };

  return (
    <span 
      className={cn(
        "text-4xl animate-bounce inline-block",
        className
      )}
    >
      {getEmoji()}
    </span>
  );
}