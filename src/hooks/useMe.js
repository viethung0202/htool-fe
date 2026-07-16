import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => api.get('/api/auth/me').then((res) => res.data),
    retry: false,
  })
}
