import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function useUpdateCard(boardId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...data }) =>
      api.patch(`/api/tasks/cards/${id}`, data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['board', boardId] }),
  })
}
