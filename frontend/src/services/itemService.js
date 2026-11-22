import { items, dashboardStats, recentClaims } from '../data/sampleData'
import { apiRequest } from './api'

export const fetchItems = async () => {
  try {
    return await apiRequest('/items/')
  } catch (error) {
    throw error
  }
}

export const fetchItemById = async (id) => {
  try {
    const response = await apiRequest(`/items/${id}/`)
    return response
  } catch (error) {
    throw error
  }
}

export const fetchDashboardData = async () => {
  try {
    const response = await apiRequest('/dashboard/')
    return response
  } catch (error) {
    return {
      stats: dashboardStats,
      claims: recentClaims,
      items,
    }
  }
}
