import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function useBoard(boardId) {
  return useQuery({
    queryKey: ['board', boardId],
    queryFn: () => api.get(`/api/tasks/boards/${boardId}`).then((res) => res.data),
    enabled: !!boardId,
  })
}
