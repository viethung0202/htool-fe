import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { toastApiError } from '@/lib/toastError'

export function useDeleteCard(boardId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => api.delete(`/api/tasks/cards/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['board', boardId] }),
    onError: (error) => toastApiError(error, 'Không xoá được card'),
  })
}
