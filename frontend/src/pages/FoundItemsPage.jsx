import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useItems } from '../hooks/useItems'
import ItemCard from '../components/items/ItemCard'

export default function FoundItemsPage() {
  const items = useItems()
  const [searchParams] = useSearchParams()
  const [category, setCategory] = useState('All')
  const query = (searchParams.get('search') || '').trim().toLowerCase()
  const categories = ['All', ...new Set(items.map((item) => item.category))]
  const visibleItems = items.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category
    const searchableText = [
      item.title,
      item.category,
      item.description,
      item.location,
      ...(item.tags || []),
    ].join(' ').toLowerCase()
    return matchesCategory && searchableText.includes(query)
  })

  return (
    <>
      <section className="bulletin-banner">
        <div className="bulletin-banner-inner">
          <h1>Found on campus</h1>
          <p>These items were handed in by students. Spot something that is yours? Open it to see the details and how to collect it.</p>
        </div>
      </section>

      <section className="bulletin-main" aria-label="Found items">
        <div className="category-filters" aria-label="Filter by category">
          {categories.map((option) => (
            <button
              key={option}
              type="button"
              className={`category-filter${category === option ? ' selected' : ''}`}
              aria-pressed={category === option}
              onClick={() => setCategory(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <p className="result-count" aria-live="polite">
          {visibleItems.length} {visibleItems.length === 1 ? 'item' : 'items'} found
        </p>

        <div className="item-grid">
          {visibleItems.length ? (
            visibleItems.map((item) => <ItemCard key={item.id} item={item} />)
          ) : (
            <div className="no-items" role="status">
              No items found. Try a different name or category.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
