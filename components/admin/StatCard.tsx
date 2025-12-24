interface StatCardProps {
  title: string;
  value: number;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6">
      <div className="text-sm font-medium text-neutral-600">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-neutral-900">{value}</div>
    </div>
  );
}
