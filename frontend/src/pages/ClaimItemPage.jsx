import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, ShieldCheck } from 'lucide-react'
import Button from '../components/common/Button'
import SectionHeader from '../components/common/SectionHeader'
import StatusPill from '../components/items/StatusPill'
import { fetchItemById } from '../services/itemService'
import { apiRequest } from '../services/api'

const initialState = {
  claimantName: '',
  claimantPhone: '',
  ownershipDetails: '',
}

export default function ClaimItemPage() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [form, setForm] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItemById(id).then(setItem)
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await apiRequest('/claims/', {
        method: 'POST',
        body: JSON.stringify({
          item: Number(id),
          claimant_name: form.claimantName,
          claimant_phone: form.claimantPhone,
          ownership_details: form.ownershipDetails,
        }),
      })

    setSubmitted(true)

    } catch (error) {
        console.error('Error submitting claim:', error)
        setError(error.message)
      }
  }

  

  if (!item) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-soft">
        <p className="text-lg font-semibold text-slate-900">Item details are loading.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-8">
      <SectionHeader
        eyebrow="Claim item"
        title={`Request ownership for ${item.title}`}
        description="Submit a claim request with your identifying information so the admin team can verify ownership."
      />

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
          <img src={item.image} alt={item.title} className="h-64 w-full object-cover" />
          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-slate-900">{item.title}</h2>
              <StatusPill status={item.status} />
            </div>
            <p className="text-sm text-slate-600">{item.description}</p>
            <div className="text-sm text-slate-600">
              <p>{item.location}</p>
              <p>Found on {item.foundDate}</p>
            </div>
            <Link to={`/items/${item.id}`} className="text-sm font-medium text-brand-700">
              View full details
            </Link>
          </div>
        </div>

        {item.status === 'available' ? (
        <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="space-y-5">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
            </p>
          )}
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-slate-700">
      Full name
    </span>
    <input
      name="claimantName"
      value={form.claimantName}
      onChange={handleChange}
      required
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
      placeholder="Your full name"
    />
  </label>

  <label className="block">
    <span className="mb-2 block text-sm font-medium text-slate-700">
      Phone number
    </span>
    <input
      type="tel"
      name="claimantPhone"
      value={form.claimantPhone}
      onChange={handleChange}
      required
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
      placeholder="08012345678"
    />
  </label>

  <label className="block">
    <span className="mb-2 block text-sm font-medium text-slate-700">
      Why do you believe this item is yours?
    </span>
    <textarea
      name="ownershipDetails"
      value={form.ownershipDetails}
      onChange={handleChange}
      rows="5"
      required
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
      placeholder="Describe how you can identify this item and where you may have lost it."
    />
  </label>
</div>
          <div className="flex items-start gap-3 rounded-2xl bg-blue-50 p-4 text-sm text-slate-700">
            <div className="mt-0.5 rounded-lg bg-blue-100 p-1 text-brand-700">
              <ShieldCheck size={16} />
            </div>
            <p>
              Claims are reviewed by the campus admin team. We may contact you for proof of ownership before final approval.
            </p>
          </div>

          <Button type="submit" className="w-full sm:w-auto">Submit claim request</Button>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 size={16} />
                Claim request submitted
              </div>
              <p className="mt-2">Your request has been sent to the university admin team for review.</p>
            </div>
          ) : null}
          </form>
) : (
  <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
    This item is no longer available for claiming.
  </div>
)}
      </div>
    </div>
  )
}
