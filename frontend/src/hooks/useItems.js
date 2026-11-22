import { useState, useEffect } from 'react'
import { fetchItems } from '../services/itemService'

export function useItems() {
  const [items, setItems] = useState([])

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await fetchItems()
        setItems(data)
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }

    loadItems()

    const intervalId = setInterval(loadItems, 10000)

    return () => clearInterval(intervalId)

  }, [])

  return items
}