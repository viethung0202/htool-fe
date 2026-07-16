const COLORS = [
  'bg-rose-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-sky-500',
  'bg-indigo-500',
  'bg-violet-500',
]

export function avatarColor(seed) {
  let hash = 0
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) | 0
  return COLORS[Math.abs(hash) % COLORS.length]
}

export function initials(email) {
  return email?.[0]?.toUpperCase() || '?'
}
