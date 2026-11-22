import { ArrowUpRight, BriefcaseBusiness, FileCheck2, ShieldCheck } from 'lucide-react'
import StatCard from '../components/common/StatCard'
import Badge from '../components/common/Badge'
import { dashboardStats, recentClaims } from '../data/sampleData'

const statusColors = {
  Pending: 'amber',
  Approved: 'emerald',
  'In Review': 'blue',
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Admin dashboard</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Recovery operations overview</h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700">
          Export report
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} trend={stat.trend} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-brand-50 p-2 text-brand-700">
              <BriefcaseBusiness size={18} />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Recent claim requests</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-[560px] divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Claim</th>
                  <th className="px-4 py-3 font-medium">Claimant</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {recentClaims.map((claim) => (
                  <tr key={claim.id}>
                    <td className="px-4 py-3 font-medium text-slate-800">{claim.item}</td>
                    <td className="px-4 py-3 text-slate-600">{claim.claimant}</td>
                    <td className="px-4 py-3 text-slate-600">{claim.date}</td>
                    <td className="px-4 py-3">
                      <Badge tone={statusColors[claim.status]}>{claim.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-brand-50 p-2 text-brand-700">
              <FileCheck2 size={18} />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Review queue</h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Pending verification</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">14</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Ready for pickup</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">18</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Escalations</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">3</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <ShieldCheck size={18} />
            Campus recovery compliance is at 96.2% this month.
          </div>
        </section>
      </div>
    </div>
  )
}
