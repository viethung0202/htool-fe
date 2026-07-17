import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { toastApiError } from '@/lib/toastError'

export function useCreateBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (title) => api.post('/api/tasks/boards', { title }).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['boards'] }),
    onError: (error) => toastApiError(error, 'Không tạo được board'),
  })
}
