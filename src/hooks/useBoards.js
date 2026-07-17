import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function useBoards() {
  return useQuery({
    queryKey: ['boards'],
    queryFn: () => api.get('/api/tasks/boards').then((res) => res.data),
  })
}
