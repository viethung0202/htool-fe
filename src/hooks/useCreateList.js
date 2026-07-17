import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function useCreateList(boardId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ title, position }) =>
      api.post('/api/tasks/lists', { title, position, boardId }).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['board', boardId] }),
  })
}
