export function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-linen">
        <span>{label}</span>
        <span className="text-gold">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded bg-paper/10">
        <div className="h-full rounded bg-gold" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}
