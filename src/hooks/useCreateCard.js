import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function useCreateCard(boardId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ title, description, position, listId }) =>
      api
        .post('/api/tasks/cards', { title, description, position, listId })
        .then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['board', boardId] }),
  })
}
