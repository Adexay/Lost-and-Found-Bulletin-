const statusMap = {
  Available: 'bg-emerald-100 text-emerald-800',
  'Pending Review': 'bg-amber-100 text-amber-800',
  Claimed: 'bg-slate-300 text-slate-800',
  Returned: 'bg-blue-100 text-blue-800',
  'Awaiting Pickup': 'bg-rose-100 text-rose-800',
}

export default function StatusPill({ status }) {
  const tone = statusMap[status] || 'bg-slate-100 text-slate-700'

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
      {status}
    </span>
  )
}
