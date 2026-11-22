export default function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm text-slate-600">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}
