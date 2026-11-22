export default function StatCard({ label, value, trend }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <p className="text-sm text-slate-500">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-3xl font-bold tracking-tight text-slate-900">{value}</p>
      </div>
      <p className="mt-3 text-xs font-medium text-emerald-700">{trend}</p>
    </div>
  )
}
