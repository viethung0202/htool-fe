import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function useDeleteList(boardId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => api.delete(`/api/tasks/lists/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['board', boardId] }),
  })
}
