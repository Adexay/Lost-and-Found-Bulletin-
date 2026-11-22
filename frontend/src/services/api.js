export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export async function apiRequest(endpoint, options = {}) {
  const headers = { ...(options.headers || {}) }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

if (!response.ok) {
  const errorData = await response.json()

  const message =
    errorData.detail ||
    Object.values(errorData).flat().join(' ')

  throw new Error(message || `Request failed: ${response.status}`)
}

  return response.json()
}