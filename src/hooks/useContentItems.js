import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function useContentItems() {
  return useQuery({
    queryKey: ['content-items'],
    queryFn: () => api.get('/api/content/items').then((res) => res.data),
  })
}
