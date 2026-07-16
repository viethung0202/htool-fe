export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Request failed')
  return res.json()
}
