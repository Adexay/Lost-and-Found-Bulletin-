import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock3, MapPin, Mail, ShieldCheck } from 'lucide-react'
import Button from '../components/common/Button'
import StatusPill from '../components/items/StatusPill'
import { fetchItemById } from '../services/itemService'

export default function ItemDetailsPage() {
  const { id } = useParams()
  const [item, setItem] = useState(null)

  useEffect(() => {
    fetchItemById(id).then(setItem)
  }, [id])

  if (!item) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-soft">
        <p className="text-lg font-semibold text-slate-900">Item not found.</p>
        <Link to="/found-items" className="mt-4 inline-block text-sm font-medium text-brand-700">
          Return to all items
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-8">
      <Link to="/found-items" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
        <ArrowLeft size={16} />
        Back to listings
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
          <img src={item.image} alt={item.title} className="h-64 w-full object-cover sm:h-80 lg:h-[420px]" />
        </div>

        <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {item.category}
            </p>
            <StatusPill status={item.status} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{item.title}</h1>
            <p className="mt-3 text-sm text-slate-600">{item.description}</p>
          </div>

          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-brand-600" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock3 size={16} className="text-brand-600" />
              <span>Found on {item.date_found}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-brand-600" />
              <span>Contact details will be shared during the claim process.</span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Item notes</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(item.tags || []).map((tag) => (
                <span key={tag} className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to={`/claim/${item.id}`}>
              <Button className="w-full sm:w-auto">Claim this item</Button>
            </Link>
            <Link to="/report">
              <Button variant="secondary" className="w-full sm:w-auto">Report a similar item</Button>
            </Link>
          </div>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-brand-50 p-2 text-brand-700">
            <ShieldCheck size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Verification process</p>
            <p className="text-sm text-slate-600">Claims are reviewed against identity details, proof of ownership, and reported item descriptions.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
