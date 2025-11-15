interface StatCardProps {
  label: string;
  value: string | number;
  color?: string;
}

function StatCard({ label, value, color = 'text-primary' }: StatCardProps) {
  return (
    <div className="p-4 rounded-xl bg-card border border-border">
      <div className="text-sm text-muted-foreground mb-1">{label}</div>
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

export default StatCard;
