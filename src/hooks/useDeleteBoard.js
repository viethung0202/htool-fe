import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { toastApiError } from '@/lib/toastError'

export function useDeleteBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => api.delete(`/api/tasks/boards/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['boards'] }),
    onError: (error) => toastApiError(error, 'Không xoá được board'),
  })
}
