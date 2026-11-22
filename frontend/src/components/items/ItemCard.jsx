import { Link } from 'react-router-dom'
import { Clock3, MapPin } from 'lucide-react'

export default function ItemCard({ item }) {

  const statusLabels = {
    available: '✓ Waiting for owner',
    claimed: '✓ Claimed',
    returned: '✓ Returned',
  }

  const statusLabel = statusLabels[item.status] || 'Status unavailable'

  return (
    <article className="bulletin-item">
      <div className="item-card-image">
        <img src={item.image} alt={item.title} />
      </div>

      <span className={`item-status ${item.status}`}>
        {statusLabel}
      </span>

      <h2 className="item-card-title">{item.title}</h2>
      <p className="item-category-label">{item.category}</p>
      <p className="item-card-description">{item.description}</p>

      <div className="item-card-info">
        <span><MapPin size={16} aria-hidden="true" />{item.location}</span>
        <span><Clock3 size={16} aria-hidden="true" />Found {item.date_found}</span>
      </div>

      <span className="item-card-spacer" />

      <Link to={`/items/${item.id}`} className="item-details-link">
        View details
      </Link>
    </article>
  )
}